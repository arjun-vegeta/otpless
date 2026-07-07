> ## Documentation Index
>
> Fetch the complete documentation index at: https://otpless.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Introduction

> Explore the OTPLESS Android SDK to seamlessly integrate various authentication methods into your applications. This SDK allows you to leverage pre-built UI components or create your own custom interfaces.

export const SampleGithubContainer = ({platform}) => {
let preBuilt = "";
let headless = "";
switch (platform.toLowerCase()) {
case "android":
preBuilt = "/frontend-sdks/app-sdks/android/loginpage";
headless = "/frontend-sdks/app-sdks/android/new/headless";
break;
case "ios":
preBuilt = "/frontend-sdks/app-sdks/ios/pre-built-ui";
headless = "/frontend-sdks/app-sdks/ios/new/headless";
break;
case "react-native":
preBuilt = "/frontend-sdks/app-sdks/react-native/pre-built-ui";
headless = "/frontend-sdks/app-sdks/react-native/new/headless";
break;
case "flutter":
preBuilt = "/frontend-sdks/app-sdks/flutter/pre-built-ui";
headless = "/frontend-sdks/app-sdks/flutter/new/headless";
break;
case "flutter-web":
preBuilt = "/frontend-sdks/web-sdks/flutter-web/pre-built-ui";
headless = "/frontend-sdks/web-sdks/flutter-web/headless";
break;
case "ionic":
preBuilt = "/frontend-sdks/app-sdks/ionic/pre-built-ui";
headless = "/frontend-sdks/app-sdks/ionic/headless";
break;
case "javascript":
preBuilt = "/frontend-sdks/web-sdks/javascript/pre-built-ui";
headless = "/frontend-sdks/web-sdks/javascript/headless";
break;
case "vue":
preBuilt = "/frontend-sdks/web-sdks/vue/pre-built-ui";
headless = "/frontend-sdks/web-sdks/vue/headless";
break;
case "angular":
preBuilt = "/frontend-sdks/web-sdks/angular/pre-built-ui";
headless = "/frontend-sdks/web-sdks/angular/headless";
break;
case "react":
preBuilt = "/frontend-sdks/web-sdks/react/pre-built-ui";
headless = "/frontend-sdks/web-sdks/react/headless";
break;
default:
githubLink = "";
}
return <CardGroup cols={2}>
{!["flutter-web"].includes(platform) && <Card title="Pre-Built UI" icon="wand-magic-sparkles" iconType="duotone" href={preBuilt}>
Use this SDK to quickly integrate a fully managed UI, customizable through the OTPLESS dashboard, enabling seamless authentication without writing any code.
</Card>}
<Card title="Headless" icon="code" iconType="duotone" href={headless}>
Utilize our Headless SDK for ultimate flexibility. Craft your own tailored UI and seamlessly integrate OTPLESS authentication capabilities using our SDK.
</Card>

        </CardGroup>;

};

<SampleGithubContainer platform="android" />
