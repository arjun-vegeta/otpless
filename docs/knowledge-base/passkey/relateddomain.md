> ## Documentation Index
>
> Fetch the complete documentation index at: https://otpless.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Allow Passkey Reuse Across Your Sites with Related Origin and Subdomain Requests

> Learn how to enable passkey reuse across multiple domains, subdomains, and applications with Related Origin and Subdomain Requests.

## The Challenge: Passkey Limitations

Passkeys, while secure, are inherently tied to a specific website and cannot be used across different domains or subdomains. This restriction is defined by the [Relying Party ID (RP ID)](https://www.w3.org/TR/webauthn-2/#rp-id), which is based on the website's domain (e.g., `example.com` or `www.example.com`).

This limitation presents challenges in scenarios such as:

1. **Multi-Domain Sites**: Users are unable to use the same passkey to access region-specific domains like `example.com` and `example.co.uk`.
2. **Branded Domains**: A single brand with multiple domains, such as `acme.com` and `acmerewards.com`, cannot share passkeys across their domains.
3. **Subdomains**: Subdomains such as `login.example.com` and `sso.example.com` cannot share the same passkey without proper configuration.
4. **Mobile Applications**: Managing passkeys for mobile apps is difficult since apps often don’t have dedicated domains.

While workarounds like identity federation or iframe-based solutions exist, they are often cumbersome. Enter **Related Origin Requests** and **Subdomain Requests** — straightforward approaches to solving these problems.

---

## The Solution: Related Origin and Subdomain Requests

### Scenario 1: Related Origin Requests

Related Origin Requests enable websites to specify additional origins allowed to share an RP ID. This allows users to reuse the same passkey across multiple domains or apps managed by the same entity.

To implement this, a website serves a JSON file at a well-defined location (`https://{RP ID}/.well-known/webauthn`). For example, if `example.com` is the RP ID and needs to share passkeys with additional domains, the file could look like this:

```json theme={null}
{
  "origins": [
    "https://example.co.uk",
    "https://example.de",
    "https://example-rewards.com"
  ]
}
```

When one of these domains requests passkey creation or authentication with `example.com` as the RP ID, browsers supporting Related Origin Requests will verify the requesting origin against this JSON file. If the origin is allowed, the process continues. If not, a `SecurityError` is thrown.

---

### Scenario 2: Subdomain Requests

For scenarios involving multiple subdomains, such as `login.example.com` and `sso.example.com`, you can enable passkey reuse by setting the **RP ID** to the root domain (`example.com`).

When the RP ID is set to the root domain, it automatically allows all its subdomains to share the same credential without needing additional configuration.

#### Key Steps for Subdomain Requests:

1. In the credential creation options for `navigator.credentials.create`, set the RP ID to the root domain (`example.com`).
2. Similarly, in the credential authentication options for `navigator.credentials.get`, use the root domain as the RP ID.
3. Ensure server-side validation verifies that the RP ID matches `example.com`.

---

## Step-by-Step Setup for Related Origin and Subdomain Requests

### Step 1: Define the `.well-known/webauthn` File (For Related Origin Requests)

Create a JSON file in your primary domain (`site-1.com`) specifying the related origins that can use its RP ID. The file should look like this:

```json theme={null}
{
  "origins": ["https://site-2.com"]
}
```

### Important Limitations:

- **Label Limit**: A maximum of 5 distinct eTLD + 1 labels can be included. For example:
  - `example.co.uk` and `example.de` share the same label `example`.
  - `example-rewards.com` has the label `example-rewards`.
- If the list exceeds 5 labels, additional entries will be ignored.

---

### Step 2: Serve the JSON File (For Related Origin Requests)

Host the JSON file at `https://site-1.com/.well-known/webauthn` with the correct `Content-Type: application/json`.

#### Example using Express.js:

```javascript theme={null}
app.get('/.well-known/webauthn', (req, res) => {
  const origins = {
    origins: ['https://site-2.com'],
  };
  return res.json(origins);
});
```

---

### Step 3: Set the RP ID in Related Domains and Subdomains

1. **For Related Origin Requests**:
   - Set the RP ID to the primary domain (e.g., `site-1.com`) in all credential creation and authentication requests made from the related domains (e.g., `site-2.com`).
   - Ensure server-side validation confirms the RP ID matches the primary domain.

2. **For Subdomain Requests**:
   - Set the RP ID to the root domain (e.g., `example.com`) in all credential creation and authentication requests made from subdomains (e.g., `login.example.com` or `sso.example.com`).
   - Ensure server-side validation verifies the RP ID matches the root domain.

---

## Benefits of Related Origin and Subdomain Requests

By implementing these approaches, you can:

1. Enable seamless passkey reuse across multiple domains or subdomains.
2. Simplify credential management for both websites and mobile apps.
3. Enhance user experience by reducing friction during login while maintaining strong security.

Related Origin and Subdomain Requests ensure a frictionless and secure user experience across your entire digital ecosystem. 🚀
