> ## Documentation Index
>
> Fetch the complete documentation index at: https://otpless.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# OTPless Android Headless SDK Variants

> Compare OTPless Android headless SDK options: WebView-backed (deprecated), fully native, and lite (phone auth only).

## Overview

OTPless provides **three Android SDK variants**, all designed to support **headless authentication** (i.e., OTPless does not require showing a dedicated UI screen). The key difference between the variants is **where the authentication orchestration happens**:

- **Variant 1**: Headless via **OTPless Web SDK running inside a hidden WebView**
- **Variant 2**: Headless via **fully native orchestration (no WebView)**
- **Variant 3**: Headless via **native orchestration + reduced footprint (Phone Auth only)**

---

## 1) OTPless Android SDK: [io.github.otpless-tech:otpless-android-sdk](https://central.sonatype.com/artifact/io.github.otpless-tech/otpless-android-sdk/overview) (WebView-backed via OTPless Web SDK) — Deprecated

### What it is

This is our first-generation headless SDK. It keeps the experience headless by using a **hidden WebView** that loads the OTPless **Web SDK** in the background. The Android SDK acts as a bridge between the host app and the web layer.

### How it works (high level)

- SDK initializes a **hidden WebView** (not user-facing)
- WebView loads the OTPless Web SDK in the background
- The web layer communicates with Android via bridge callbacks
- Android SDK forwards structured responses to the host app

### Why it’s still “headless”

- The WebView is **not shown as a UI screen**
- Authentication orchestration runs in the background
- The host app controls the visible UI while receiving callbacks/events

### Key characteristics

- ✅ Headless experience (background WebView)
- ⚠️ Depends on **WebView + Web SDK runtime**
- Orchestration happens primarily in the Web SDK, bridged to native

---

## 2) OTPless Headless SDK (Native): [io.github.otpless-tech:otpless-headless-sdk](https://central.sonatype.com/artifact/io.github.otpless-tech/otpless-headless-sdk/overview) (Fully Native, No WebView)

### What it is

This variant removes the WebView dependency completely. The SDK connects **directly to OTPless APIs**, and orchestration happens in **native Android code**.

### How it works (high level)

- SDK communicates directly with OTPless APIs
- Orchestration, state management, retries, and callbacks are handled natively
- The host app receives structured auth results and manages its own UI

### Best for

- Apps that prefer fully native execution
- Better control over UX and flow states
- Environments where WebView is discouraged or restricted

### Key characteristics

- ✅ Headless experience
- ✅ No WebView dependency
- ✅ Native orchestration and tighter app integration

---

## 3) OTPless Headless Lite SDK: [io.github.otpless-tech:otpless-headless-lite](https://central.sonatype.com/artifact/io.github.otpless-tech/otpless-headless-lite) (Native + Size Optimized, Phone Auth Only)

### What it is

A trimmed-down version of Variant 2 focused on minimizing SDK size. It supports **only Phone Authentication**:

- **SNA (Silent Network Authentication)**
- **OTP**

It excludes additional authentication methods such as:

- Google / Truecaller / Facebook flows
- Passkeys
- Other non-phone auth methods

### Best for

- Apps where APK size / dependency footprint is a priority
- Teams that only need phone-number login

### Key characteristics

- ✅ Headless experience
- ✅ No WebView dependency
- ✅ Smallest footprint
- ✅ Phone auth only (SNA/OTP)

---

## Quick Comparison

| Variant                                                                        | Headless Mechanism               | WebView | Orchestration               | Auth Coverage                          | Best Fit                           |
| ------------------------------------------------------------------------------ | -------------------------------- | ------: | --------------------------- | -------------------------------------- | ---------------------------------- |
| **1. OTPless Android SDK (WebView-backed via OTPless Web SDK)** _(Deprecated)_ | Hidden WebView (e.g., 1px × 1px) |  ✅ Yes | Web SDK (bridged to native) | Broad (Phone + Social + Passkey, etc.) | Headless + web-based orchestration |
| **2. OTPless Headless SDK (Native)**                                           | Fully native                     |   ❌ No | Native                      | Broad (Phone + Social + Passkey, etc.) | Pure native control & performance  |
| **3. OTPless Headless Lite SDK (Native + Size Optimized)**                     | Fully native                     |   ❌ No | Native                      | **Phone only (SNA/OTP)**               | Smallest size, phone auth only     |

---

## Recommendation

- The **WebView-based headless SDK (Variant 1)** is **deprecated**. For new integrations, use the **Native Headless SDK (Variant 2)**.
- If your requirement is **only Phone Authentication (SNA/OTP)** and SDK size is a key concern, use **Headless Lite (Variant 3)**.
