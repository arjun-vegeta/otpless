import * as fs from 'fs';
import * as path from 'path';
import { CompatibilityTuple, Flow } from '../../types';

export function detectStack(
  projectDir: string = process.cwd(),
): CompatibilityTuple {
  const platforms = new Set<string>();
  const frameworks = new Set<string>();
  let package_manager: CompatibilityTuple['package_manager'] = 'unknown';
  const otpless_packages: CompatibilityTuple['otpless_packages'] = [];
  const detected_flows: Flow[] = [];
  let confidence: 'high' | 'medium' | 'low' = 'low';

  const packageJsonPath = path.join(projectDir, 'package.json');
  const pyprojectTomlPath = path.join(projectDir, 'pyproject.toml');
  const requirementsTxtPath = path.join(projectDir, 'requirements.txt');

  if (fs.existsSync(packageJsonPath)) {
    const yarnLockExists = fs.existsSync(path.join(projectDir, 'yarn.lock'));
    const pnpmLockExists = fs.existsSync(
      path.join(projectDir, 'pnpm-lock.yaml'),
    );
    package_manager = yarnLockExists ? 'yarn' : pnpmLockExists ? 'pnpm' : 'npm';

    try {
      const pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
      const deps = {
        ...(pkg.dependencies || {}),
        ...(pkg.devDependencies || {}),
      };

      if (deps['react-native']) {
        platforms.add('react-native');
        frameworks.add('react-native');
        confidence = 'high';
      } else if (deps['react']) {
        platforms.add('web-react');
        frameworks.add('react');
        if (deps['next']) {
          platforms.add('node-backend');
          frameworks.add('nextjs');
        }
        confidence = 'high';
      } else if (deps['@angular/core']) {
        platforms.add('angular');
        frameworks.add('angular');
        confidence = 'high';
      } else if (deps['vue']) {
        platforms.add('vue');
        frameworks.add('vue');
        confidence = 'high';
      } else if (
        deps['@ionic/angular'] ||
        deps['@ionic/react'] ||
        deps['@ionic/vue']
      ) {
        platforms.add('ionic');
        frameworks.add('ionic');
        confidence = 'high';
      }

      if (deps['express']) {
        platforms.add('node-backend');
        frameworks.add('express');
        confidence = 'high';
      } else if (
        (deps['typescript'] || deps['node']) &&
        !deps['react'] &&
        !deps['react-native'] &&
        !deps['@angular/core'] &&
        !deps['vue']
      ) {
        platforms.add('node-backend');
        frameworks.add('node');
        if (confidence === 'low') confidence = 'medium';
      }

      const getResolvedVersion = (pkgName: string): string | null => {
        try {
          if (package_manager === 'npm') {
            const lockPath = path.join(projectDir, 'package-lock.json');
            if (fs.existsSync(lockPath)) {
              const lock = JSON.parse(fs.readFileSync(lockPath, 'utf-8'));
              if (lock.packages && lock.packages[`node_modules/${pkgName}`]) {
                return lock.packages[`node_modules/${pkgName}`].version || null;
              }
              if (lock.dependencies && lock.dependencies[pkgName]) {
                return lock.dependencies[pkgName].version || null;
              }
            }
          } else if (package_manager === 'yarn') {
            const lockPath = path.join(projectDir, 'yarn.lock');
            if (fs.existsSync(lockPath)) {
              const content = fs.readFileSync(lockPath, 'utf-8');
              const regex = new RegExp(
                `"${pkgName}@[^"]+":\\s*\\n\\s*version\\s+"([^"]+)"`,
                'm',
              );
              const match = content.match(regex);
              if (match) return match[1];
              const regex2 = new RegExp(
                `${pkgName}@[^:]+:\\s*\\n\\s*version\\s*[:=]?\\s*"?([^"\\n]+)"?`,
                'i',
              );
              const match2 = content.match(regex2);
              if (match2) return match2[1].trim();
            }
          } else if (package_manager === 'pnpm') {
            const lockPath = path.join(projectDir, 'pnpm-lock.yaml');
            if (fs.existsSync(lockPath)) {
              const content = fs.readFileSync(lockPath, 'utf-8');
              const regex = new RegExp(`/${pkgName}/([^\\s:]+)`, 'g');
              const match = regex.exec(content);
              if (match) return match[1];
            }
          }
        } catch {
          // ignore
        }
        return null;
      };

      const targetPackages = [
        {
          name: 'otpless-react',
          sdk_family: 'headless',
          sdk_generation: 'new',
        },
        {
          name: 'otpless-headless-js',
          sdk_family: 'headless',
          sdk_generation: 'new',
        },
        { name: 'otpless-rn', sdk_family: 'headless', sdk_generation: 'new' },
        {
          name: 'otpless-headless-rn',
          sdk_family: 'headless',
          sdk_generation: 'new',
        },
        {
          name: 'otpless-react-native',
          sdk_family: 'prebuilt-ui',
          sdk_generation: 'legacy',
        },
        {
          name: 'otpless-react-native-lp',
          sdk_family: 'prebuilt-ui',
          sdk_generation: 'new',
        },
      ] as const;

      for (const targetPkg of targetPackages) {
        if (deps[targetPkg.name]) {
          otpless_packages.push({
            name: targetPkg.name,
            declared_version: deps[targetPkg.name],
            resolved_version: getResolvedVersion(targetPkg.name),
            sdk_family: targetPkg.sdk_family,
            sdk_generation: targetPkg.sdk_generation,
          });
          detected_flows.push(
            targetPkg.sdk_family === 'headless' ? 'headless' : 'prebuilt-ui',
          );
        }
      }
    } catch {
      // Ignore parse errors
    }
  }

  const indexHtmlPath = path.join(projectDir, 'index.html');
  const publicHtmlPath = path.join(projectDir, 'public/index.html');
  const htmlPath = fs.existsSync(indexHtmlPath)
    ? indexHtmlPath
    : fs.existsSync(publicHtmlPath)
      ? publicHtmlPath
      : null;
  if (htmlPath) {
    try {
      const html = fs.readFileSync(htmlPath, 'utf-8');
      if (html.includes('otpless') || html.includes('otpless-sdk')) {
        detected_flows.push('prebuilt-ui');
        if (platforms.size === 0) {
          platforms.add('javascript');
          confidence = 'medium';
        }
      }
    } catch {
      // ignore
    }
  }

  if (fs.existsSync(pyprojectTomlPath) || fs.existsSync(requirementsTxtPath)) {
    let isFastAPI = false;
    let declaredPythonVersion: string | null = null;
    let hasOtplessPython = false;

    if (fs.existsSync(requirementsTxtPath)) {
      const req = fs.readFileSync(requirementsTxtPath, 'utf-8');
      if (req.includes('fastapi')) isFastAPI = true;
      const match = req.match(/^(?:otpless-python|otpless)==([^\s#]+)/m);
      if (match) {
        declaredPythonVersion = match[1];
        hasOtplessPython = true;
      } else if (/^(?:otpless-python|otpless)\s*(?:[>=<~!]|$)/m.test(req)) {
        hasOtplessPython = true;
      }
    }
    if (fs.existsSync(pyprojectTomlPath)) {
      const pyproj = fs.readFileSync(pyprojectTomlPath, 'utf-8');
      if (pyproj.includes('fastapi')) isFastAPI = true;
      const match = pyproj.match(
        /(?:^|\s|"|')(?:otpless-python|otpless)\s*(?:[>=<~!]*\s*['"]?([^'"<>=~!\s,\]]+))?/m,
      );
      if (match && match[1]) {
        declaredPythonVersion = match[1];
        hasOtplessPython = true;
      } else if (
        /(?:^|\s|"|')(?:otpless-python|otpless)(?:\s|"|'|$|[>=<~!,\]])/m.test(
          pyproj,
        )
      ) {
        hasOtplessPython = true;
      }
    }

    if (isFastAPI) {
      platforms.add('fastapi');
      frameworks.add('fastapi');
      confidence = 'high';

      if (hasOtplessPython) {
        otpless_packages.push({
          name: 'otpless-python',
          declared_version: declaredPythonVersion,
          resolved_version: declaredPythonVersion,
          sdk_family: 'unknown',
          sdk_generation: 'new',
        });
      }

      const mainPyPath = path.join(projectDir, 'main.py');
      const appPyPath = path.join(projectDir, 'app/main.py');
      const targetPy = fs.existsSync(mainPyPath)
        ? mainPyPath
        : fs.existsSync(appPyPath)
          ? appPyPath
          : null;
      if (targetPy) {
        try {
          const code = fs.readFileSync(targetPy, 'utf-8');
          if (code.includes('otpless') || code.includes('validate_token')) {
            detected_flows.push('token-validation');
          }
        } catch {
          // ignore
        }
      }
    }
  }

  const isReactNative = platforms.has('react-native');

  if (!isReactNative) {
    if (
      fs.existsSync(path.join(projectDir, 'build.gradle')) ||
      fs.existsSync(path.join(projectDir, 'app/build.gradle')) ||
      fs.existsSync(path.join(projectDir, 'build.gradle.kts'))
    ) {
      platforms.add('android');
      frameworks.add('android');
      package_manager = 'gradle';
      confidence = 'high';

      const buildGradlePath = fs.existsSync(
        path.join(projectDir, 'app/build.gradle'),
      )
        ? path.join(projectDir, 'app/build.gradle')
        : path.join(projectDir, 'build.gradle');
      try {
        const gradleContent = fs.readFileSync(buildGradlePath, 'utf-8');
        if (gradleContent.includes('otpless-headless-sdk')) {
          otpless_packages.push({
            name: 'otpless-headless-sdk',
            declared_version: null,
            resolved_version: null,
            sdk_family: 'headless',
            sdk_generation: 'new',
          });
        }
        if (gradleContent.includes('otpless-android-sdk')) {
          otpless_packages.push({
            name: 'otpless-android-sdk',
            declared_version: null,
            resolved_version: null,
            sdk_family: 'headless',
            sdk_generation: 'legacy',
          });
        }
      } catch {
        // ignore
      }
    }

    const hasXcodeProj = fs
      .readdirSync(projectDir)
      .some(
        (f: string) => f.endsWith('.xcodeproj') || f.endsWith('.xcworkspace'),
      );
    if (
      hasXcodeProj ||
      fs.existsSync(path.join(projectDir, 'Podfile')) ||
      fs.existsSync(path.join(projectDir, 'Package.swift'))
    ) {
      platforms.add('ios');
      frameworks.add('ios');
      package_manager = fs.existsSync(path.join(projectDir, 'Podfile'))
        ? 'cocoapods'
        : 'spm';
      confidence = 'high';

      const podfilePath = path.join(projectDir, 'Podfile');
      if (fs.existsSync(podfilePath)) {
        try {
          const podContent = fs.readFileSync(podfilePath, 'utf-8');
          if (podContent.includes('OtplessBM')) {
            otpless_packages.push({
              name: 'OtplessBM',
              declared_version: null,
              resolved_version: null,
              sdk_family: 'headless',
              sdk_generation: 'new',
            });
          }
          if (podContent.includes('OtplessSDK')) {
            otpless_packages.push({
              name: 'OtplessSDK',
              declared_version: null,
              resolved_version: null,
              sdk_family: 'headless',
              sdk_generation: 'legacy',
            });
          }
        } catch {
          // ignore
        }
      }
    }
  }

  // Flutter detection
  const pubspecPath = path.join(projectDir, 'pubspec.yaml');
  if (fs.existsSync(pubspecPath)) {
    package_manager = 'pub';
    confidence = 'high';
    try {
      const pubContent = fs.readFileSync(pubspecPath, 'utf-8');
      const isWeb = fs.existsSync(path.join(projectDir, 'web/index.html'));
      if (isWeb) {
        platforms.add('flutter-web');
        frameworks.add('flutter-web');
      } else {
        platforms.add('flutter');
        frameworks.add('flutter');
      }

      if (
        pubContent.includes('otpless_headless_flutter') ||
        pubContent.includes('otpless_flutter')
      ) {
        otpless_packages.push({
          name: 'otpless_headless_flutter',
          declared_version: null,
          resolved_version: null,
          sdk_family: 'headless',
          sdk_generation: 'new',
        });
        detected_flows.push('headless');
      }
    } catch {
      // ignore
    }
  }

  // Django & Flask detection
  if (fs.existsSync(requirementsTxtPath) || fs.existsSync(pyprojectTomlPath)) {
    try {
      const reqContent =
        (fs.existsSync(requirementsTxtPath)
          ? fs.readFileSync(requirementsTxtPath, 'utf-8')
          : '') +
        (fs.existsSync(pyprojectTomlPath)
          ? fs.readFileSync(pyprojectTomlPath, 'utf-8')
          : '');
      if (
        reqContent.includes('django') ||
        fs.existsSync(path.join(projectDir, 'manage.py'))
      ) {
        platforms.add('django');
        frameworks.add('django');
        package_manager = 'pip';
        confidence = 'high';
      }
      if (reqContent.includes('flask')) {
        platforms.add('flask');
        frameworks.add('flask');
        package_manager = 'pip';
        confidence = 'high';
      }
    } catch {
      // ignore
    }
  }

  // Laravel detection
  if (
    fs.existsSync(path.join(projectDir, 'artisan')) ||
    fs.existsSync(path.join(projectDir, 'composer.json'))
  ) {
    package_manager = 'composer';
    if (fs.existsSync(path.join(projectDir, 'artisan'))) {
      platforms.add('laravel');
      frameworks.add('laravel');
      confidence = 'high';
    }
  }

  // Spring Boot detection
  if (fs.existsSync(path.join(projectDir, 'pom.xml'))) {
    try {
      const pomContent = fs.readFileSync(
        path.join(projectDir, 'pom.xml'),
        'utf-8',
      );
      if (pomContent.includes('spring-boot')) {
        platforms.add('spring');
        frameworks.add('spring');
        package_manager = 'maven';
        confidence = 'high';
      }
    } catch {
      // ignore
    }
  }

  // Go detection
  if (fs.existsSync(path.join(projectDir, 'go.mod'))) {
    platforms.add('go');
    frameworks.add('go');
    package_manager = 'go';
    confidence = 'high';
  }

  // Rails detection
  if (fs.existsSync(path.join(projectDir, 'Gemfile'))) {
    try {
      const gemContent = fs.readFileSync(
        path.join(projectDir, 'Gemfile'),
        'utf-8',
      );
      if (gemContent.includes('rails')) {
        platforms.add('rails');
        frameworks.add('rails');
        package_manager = 'rubygems';
        confidence = 'high';
      }
    } catch {
      // ignore
    }
  }

  // CMS Platform detection (WordPress, Shopify, Magento)
  if (fs.existsSync(path.join(projectDir, 'wp-config.php'))) {
    platforms.add('wordpress');
    frameworks.add('wordpress');
    confidence = 'high';
  }
  if (fs.existsSync(path.join(projectDir, 'shopify.theme.toml'))) {
    platforms.add('shopify');
    frameworks.add('shopify');
    confidence = 'high';
  }
  if (
    fs.existsSync(path.join(projectDir, 'app/etc/config.php')) &&
    fs.existsSync(path.join(projectDir, 'registration.php'))
  ) {
    platforms.add('magento');
    frameworks.add('magento');
    confidence = 'high';
  }

  // Compose Multiplatform / KMP detection
  if (
    fs.existsSync(path.join(projectDir, 'composeApp')) ||
    fs.existsSync(path.join(projectDir, 'shared/src/commonMain')) ||
    fs.existsSync(path.join(projectDir, 'src/commonMain'))
  ) {
    platforms.add('cmp');
    frameworks.add('cmp');
    package_manager = 'gradle';
    confidence = 'high';
  }

  if (platforms.has('node-backend') && frameworks.size === 0) {
    if (
      fs.existsSync(path.join(projectDir, 'app.js')) ||
      fs.existsSync(path.join(projectDir, 'index.js')) ||
      fs.existsSync(path.join(projectDir, 'server.js'))
    ) {
      frameworks.add('node');
    }
  }

  const uniqueFlows = Array.from(new Set(detected_flows));

  return {
    platforms: Array.from(platforms),
    frameworks: Array.from(frameworks),
    package_manager,
    otpless_packages,
    detected_flows: uniqueFlows,
    confidence,
  };
}
