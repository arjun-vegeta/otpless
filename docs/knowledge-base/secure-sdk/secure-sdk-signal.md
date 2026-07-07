> ## Documentation Index
>
> Fetch the complete documentation index at: https://otpless.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Secure SDK Signals

> OTPLESS Smart Signals provide actionable device intelligence to help fight fraud. This documentation covers the overview, setup, and individual Smart Signal components for both web and mobile platforms.

## Smart Signal Components

### 1.1 Suspect Score

**Availability:** iOS, Android, Browser

Suspect Score combines all Smart Signals into a weighted integer value based on their global probability.

```json theme={null}
{
  "suspectScore": {
    "data": {
      "result": 0
    }
  }
}
```

### 1.2 Velocity Signals

**Availability:** iOS, Android, Browser

Velocity Signals sum key data points for a specific visitorID at three intervals: 5 minutes, 1 hour, and 24 hours.

```json theme={null}
{
  "velocity": {
    "data": {
      "distinctIp": {
        "intervals": {
          "5m": 1,
          "1h": 1,
          "24h": 5
        }
      }
    }
  }
}
```

### 1.3 Browser Smart Signals

#### 1.3.1 Browser Bot Detection

**Availability:** Browser

Detects good and bad bots, allowing you to filter or block automated abuse attempts.

```json theme={null}
{
  "botd": {
    "data": {
      "bot": {
        "result": "bad",
        "type": "headless"
      },
      "url": "https://example.com/",
      "ip": "193.165.141.254",
      "time": "2024-04-12T09:29:59.588Z",
      "userAgent": "Headless",
      "requestId": "1712914199539.K1EXmu"
    }
  }
}
```

#### 1.3.2 Browser Incognito Detection

**Availability:** Browser

Detects whether incognito or private modes are being used by the visitor.

```json theme={null}
{
  "incognito": {
    "data": {
      "result": true
    }
  }
}
```

#### 1.3.3 IP Geolocation

**Availability:** iOS, Android, Browser

Provides information about the physical location of the originating IP address.

```json theme={null}
{
  "ipInfo": {
    "data": {
      "v4": {
        "address": "94.142.239.124",
        "geolocation": {
          "accuracyRadius": 20,
          "latitude": 50.05,
          "longitude": 14.4,
          "postalCode": "150 00",
          "timezone": "Europe/Prague",
          "city": {
            "name": "Prague"
          },
          "country": {
            "code": "CZ",
            "name": "Czechia"
          },
          "continent": {
            "code": "EU",
            "name": "Europe"
          },
          "subdivisions": [
            {
              "isoCode": "10",
              "name": "Prague"
            }
          ]
        },
        "asn": {
          "asn": "7922",
          "name": "COMCAST-7922",
          "network": "73.136.0.0/13"
        },
        "datacenter": {
          "result": true,
          "name": "DediPath"
        }
      },
      "v6": {
        // Similar structure as v4
      }
    }
  }
}
```

#### 1.3.4 VPN Detection for Browsers

**Availability:** Browser

Detects whether the user is using a VPN based on timezone mismatch, known public VPN providers, and OS mismatch.

```json theme={null}
{
  "vpn": {
    "data": {
      "result": true,
      "originTimezone": "Europe/Prague",
      "originCountry": "unknown",
      "methods": {
        "timezoneMismatch": true,
        "publicVPN": true,
        "auxiliaryMobile": false,
        "osMismatch": true
      }
    }
  }
}
```

#### 1.3.5 Browser Tamper Detection

**Availability:** Browser

Detects attempts to confuse fingerprinting algorithms through techniques like User Agent spoofing.

```json theme={null}
{
  "tampering": {
    "data": {
      "result": true,
      "anomalyScore": 0.97
    }
  }
}
```

#### 1.3.6 Virtual Machine Detection

**Availability:** Browser

Detects if the browser is running inside virtualization software.

```json theme={null}
{
  "virtualMachine": {
    "data": {
      "result": true
    }
  }
}
```

#### 1.3.7 Privacy-Focused Settings

**Availability:** Browser

Detects if privacy settings that can randomize and obfuscate signal output are enabled.

```json theme={null}
{
  "privacySettings": {
    "data": {
      "result": true
    }
  }
}
```

#### 1.3.8 Developer Tools Detection

**Availability:** Browser

Detects if developer tools are manually opened in Chrome or Firefox browsers.

```json theme={null}
{
  "developerTools": {
    "data": {
      "result": true
    }
  }
}
```

#### 1.3.9 Remote Control Tools Detection

**Availability:** Browser

Detects the usage of remote control tools like AnyDesk, TeamViewer, and RDP.

```json theme={null}
{
  "remoteControl": {
    "data": {
      "result": true
    }
  }
}
```

#### 1.3.10 IP Blocklist Matching

**Availability:** iOS, Android, Browser

Checks if an IP address is present in different public and proprietary blocklists.

```json theme={null}
{
  "ipBlocklist": {
    "data": {
      "result": false,
      "details": {
        "emailSpam": false,
        "attackSource": false
      }
    }
  }
}
```

#### 1.3.11 High-Activity Device

**Availability:** iOS, Android, Browser

Detects spikes in traffic connected to a single visitorID.

```json theme={null}
{
  "highActivity": {
    "data": {
      "result": true,
      "dailyRequests": 42
    }
  }
}
```

#### 1.3.12 Raw Device Attributes

**Availability:** Browser

Exposes additional data points collected through the JavaScript agent.

```json theme={null}
{
  "rawDeviceAttributes": {
    "data": {
      "<field_name>": {
        "value": 127
      }
    }
  }
}
```

### 1.4 Mobile-specific Smart Signals

#### 1.4.1 Android Emulator Detection

**Availability:** Android

Detects if the request is coming from an Android emulator.

```json theme={null}
{
  "emulator": {
    "data": {
      "result": false
    }
  }
}
```

#### 1.4.2 Android Tamper Detection

**Availability:** Android

Detects rooted Android devices.

```json theme={null}
{
  "rootApps": {
    "data": {
      "result": false
    }
  }
}
```

#### 1.4.3 Cloned App Detection

**Availability:** Android

Identifies if a request is coming from a cloned application.

```json theme={null}
{
  "clonedApp": {
    "data": {
      "result": false
    }
  }
}
```

#### 1.4.4 Factory Reset Detection

**Availability:** iOS, Android

Indicates when a mobile device was most recently factory reset.

```json theme={null}
{
  "factoryReset": {
    "data": {
      "time": "2023-07-19T011:00:00Z",
      "timestamp": 1689445704
    }
  }
}
```

#### 1.4.5 Frida Detection

**Availability:** iOS, Android

Detects if Frida is being used to dynamically instrument the app.

```json theme={null}
{
  "frida": {
    "data": {
      "result": false
    }
  }
}
```

#### 1.4.6 Geolocation Spoofing Detection

**Availability:** iOS, Android

Detects if the location of the mobile device has been spoofed.

```json theme={null}
{
  "locationSpoofing": {
    "data": {
      "result": false
    }
  }
}
```

#### 1.4.7 Jailbroken Device Detection

**Availability:** iOS

Detects if an iPhone or iPad has been jailbroken.

```json theme={null}
{
  "jailbroken": {
    "data": {
      "result": false
    }
  }
}
```

#### 1.4.8 VPN Detection for Mobile Devices

**Availability:** iOS, Android

Detects if the mobile device is using an active VPN connection.

```json theme={null}
{
  "vpn": {
    "data": {
      "result": false,
      "originTimezone": "Europe/Berlin",
      "originCountry": "DE",
      "methods": {
        "timezoneMismatch": false,
        "publicVPN": false,
        "auxiliaryMobile": false,
        "osMismatch": false
      }
    }
  }
}
```

## Conclusion

OTPLESS Smart Signals provide a comprehensive suite of fraud detection and device intelligence tools for both web and mobile platforms. By leveraging these signals, you can enhance your application's security, detect potential fraud attempts, and make informed decisions about user authenticity.

Remember to use these signals responsibly and in compliance with all applicable privacy laws and regulations. For more information on implementation or to enable specific signals, please contact OTPLESS support.
