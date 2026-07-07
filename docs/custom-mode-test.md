> ## Documentation Index
>
> Fetch the complete documentation index at: https://otpless.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Custom mode test

export function openSearch() {
document.getElementById('search-bar-entry').click();
}

<div className="relative w-full flex items-center justify-center" style={{ height: '24rem', backgroundColor: '#00020F', overflow: 'hidden' }}>
  <div style={{ flex: 'none' }}>
    <img src="https://mintcdn.com/otpless-96/_aEz_FhlLI0izHsE/images/otpless-hero-image.svg?fit=max&auto=format&n=_aEz_FhlLI0izHsE&q=85&s=36bdf35c4d89451aeba981a1d94035eb" style={{ height: '400px', width: '2000px', pointerEvents: 'none' }} width="1000" height="600" data-path="images/otpless-hero-image.svg" />
  </div>
</div>

<div
  style={{marginTop: '6rem', marginBottom: '8rem', maxWidth: '70rem', marginLeft: 'auto',
marginRight: 'auto', paddingLeft: '1.25rem',
paddingRight: '1.25rem' }}
>
  <div
    style={{
textAlign: 'center',
fontSize: '24px',
fontWeight: '600',
color: '#121142',
marginBottom: '3rem',
topMargin: '-1rem'
}}
  >
    Choose a topic below or simply{' '}
    <span className="text-primary">get started</span>
  </div>

  <CardGroup cols={3}>
    <Card title="Guides" icon="book-open" href="/guides/quickstart">
      Practical guides and best practices to get you up and running quickly.
    </Card>

    <Card title="Reference" icon="code-simple" href="/reference">
      Comprehensive details about the Mintlify API.
    </Card>

    <Card title="Examples" icon="grid-round" iconType="solid" href="/examples">
      Hands-on examples of Mintlify documentation.
    </Card>

    <Card title="Integrations" icon="link-simple" href="/guides/integrations">
      Mintlify's growing number of third-party integrations.
    </Card>

    <Card title="Tools" icon="wrench" href="/tools">
      Practical toolkits for building your documentation
    </Card>

    <Card title="Releases" icon="party-horn" href="/release-notes">
      News about features and changes in Mintlify.
    </Card>

  </CardGroup>
</div>
