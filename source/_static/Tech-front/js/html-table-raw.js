var data = [{
        'tag': 'html',
        'description': '<p>The HTML <html> element represents the root (top-level element) of an HTML document, so it is also referred to as the root element. All other elements must be descendants of this element.</p>',
        'source': `<!DOCTYPE html>
            <html lang="en">
            <head>...</head>
            <body>...</body>
            </html>`,
        'output': '',
        'type': 'root',
        'ref': 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/html'
    },
    {
        'tag': 'head',
        'description': '<p>The HTML <head> element contains machine-readable information (metadata) about the document, like its title, scripts, and style sheets.</p>',
        'source': `<!DOCTYPE html>
            <html lang="en">
            <head>
                <title>Document title</title>
            </head>
            </html>`,
        'output': '',
        'type': 'root',
        'ref': 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/head'
    },
    {
        'tag': 'meta',
        'description': '<p>The HTML <meta> element represents metadata that cannot be represented by other HTML meta-related elements, like <base>, <link>, <script>, <style> or <title>.</p>',
        'source': `<meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">`,
        'output': '',
        'type': 'meta',
        'ref': 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta'
    },
    {
        'tag': 'base',
        'description': `<p>The HTML <base> element specifies the base URL to use for all relative URLs contained within a document. There can be only one <base> element in a document.</p>
            <h2>Base priority</h2>
            <p>If multiple <base> elements are specified, only the first href and first target value are used; all others are ignored.</p>
            <h2></h2>
            <p>Anchor tags within a page, e.g. <a href="#anchor">anchor</a>, are resolved by using the base URL as the reference and trigger an HTTP request to the base URL.</p>
            <p>For example, given this base URL: <base href="http://www.example.com/"></p>
            <p>... and this anchor: <a href="#anchor">Anker</a><p>
            <p>... the link points to: http://www.example.com/#anchor</p>`,
        'source': `<base href="http://www.example.com/">
        <base target="_blank" href="http://www.example.com/">`,
        'output': '',
        'type': 'meta',
        'ref': 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/base'
    },
    {
        'tag': 'link',
        'description': '<p>The HTML External Resource Link element (<link>) specifies relationships between the current document and an external resource. This element is most commonly used to link to stylesheets, but is also used to establish site icons (both "favicon" style icons and icons for the home screen and apps on mobile devices) among other things.</p>',
        'source': `<!-- include a stylesheet -->
            <link href="style.css" rel="stylesheet">

            <!-- provide a media type or query inside a media attribute -->
            <link href="print.css" rel="stylesheet" media="print">
            <link href="mobile.css" rel="stylesheet" media="all">
            <link href="desktop.css" rel="stylesheet" media="screen and (min-width: 600px)">
            <link href="highres.css" rel="stylesheet" media="screen and (min-resolution: 300dpi)">`,
        'output': '',
        'type': 'meta',
        'ref': 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/link'
    },
    {
        'tag': 'style',
        'description': '<p>The HTML <style> element contains style information for a document, or part of a document.</p>',
        'source': '',
        'output': '',
        'type': 'meta',
        'ref': 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/style'
    },
    {
        'tag': 'title',
        'description': '<p>The HTML Title element (<title>) defines the document&apos;s title that is shown in a browser&apos;s title bar or a page&apos;s tab.</p>',
        'source': '<title>Awesome page title</title>',
        'output': '',
        'type': 'meta',
        'ref': 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/title'
    },
    {
        'tag': 'body',
        'description': '<p>The HTML <body> Element represents the content of an HTML document. There can be only one <body> element in a document.</p>',
        'source': '',
        'output': '',
        'type': 'sectioning',
        'ref': 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/body'
    },
    {
        'tag': 'main',
        'description': '<p>The HTML <main> element represents the dominant content of the <body> of a document. The main content area consists of content that is directly related to or expands upon the central topic of a document, or the central functionality of an application.</p>',
        'source': '',
        'output': '',
        'type': 'sectioning',
        'ref': 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/main'
    },
    {
        'tag': 'header',
        'description': '<p>The HTML <header> element represents introductory content, typically a group of introductory or navigational aids. It may contain some heading elements but also a logo, a search form, an author name, and other elements.</p>',
        'source': `<!-- page header -->
        <header>
            <h1>Main Page Title</h1>
        </header>
        <!-- article header -->
        <article>
            <header>
                <h2>Article Title</h2>
            </header>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugit, error.</p>
        </article>`,
        'output': 'true',
        'type': 'sectioning',
        'ref': 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/header'
    },
    {
        'tag': 'nav',
        'description': '<p>The HTML <nav> element represents a section of a page whose purpose is to provide navigation links, either within the current document or to other documents. Common examples of navigation sections are menus, tables of contents, and indexes.</p>',
        'source': '',
        'output': '',
        'type': 'sectioning',
        'ref': 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/nav'
    },
    {
        'tag': 'article',
        'description': `<p>The HTML <article> element represents a self-contained composition in a document, page, application, or site, which is intended to be independently distributable or reusable</p>
        <ul>
            <li>When an <article> element is nested, the inner element represents an article related to the outer element. For example, the comments of a blog post can be <article> elements nested in the <article> representing the blog post.</li>
            <li>Author information of an <article> element can be provided through the <address> element, but it doesn't apply to nested <article> elements.</li>
            <li>The publication date and time of an <article> element can be described using the datetime attribute of a <time> element.</li>
        </ul>`,
        'source': '',
        'output': '',
        'type': 'sectioning',
        'ref': 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/article'
    },
    {
        'tag': 'section',
        'description': '<p>The HTML <section> element represents a standalone section — which doesn&apos;t have a more specific semantic element to represent it — contained within an HTML document.</p>',
        'source': '',
        'output': '',
        'type': 'sectioning',
        'ref': 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/section'
    },
    {
        'tag': 'aside',
        'description': '<p>The HTML <aside> element represents a portion of a document whose content is only indirectly related to the document&apos;s main content.</p>',
        'source': '',
        'output': '',
        'type': 'sectioning',
        'ref': 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/aside'
    },
    {
        'tag': 'footer',
        'description': '<p>The HTML <footer> element represents a footer for its nearest sectioning content or sectioning root element. A footer typically contains information about the author of the section, copyright data or links to related documents.</p>',
        'source': '',
        'output': '',
        'type': 'sectioning',
        'ref': 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/footer'
    },
    {
        'tag': 'address',
        'description': `<p>The HTML <address> element indicates that the enclosed HTML provides contact information for a person or people, or for an organization.</p>
        <p>Typically an <address> element can be placed inside the <footer> element of the current section, if any.</p>`,
        'source': `<address>
            You can contact author at <a href="http://www.somedomain.com/contact">www.somedomain.com</a>.<br>
            If you see any bugs, please <a href="mailto:webmaster@somedomain.com">contact webmaster</a>.<br>
            You may also want to visit us:<br>
            Mozilla Foundation<br>
            331 E Evelyn Ave<br>
            Mountain View, CA 94041<br>
            USA
            </address>`,
        'output': 'true',
        'type': 'sectioning',
        'ref': 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/address'
    },
    {
        'tag': 'hgroup',
        'description': '<p>The HTML <hgroup> element represents a multi-level heading for a section of a document. It groups a set of <h1>–<h6> elements.</p>',
        'source': '',
        'output': '',
        'type': 'sectioning',
        'ref': 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/hgroup'
    },
    {
        'tag': 'h1',
        'description': '<p>The HTML <h1>–<h6> elements represent six levels of section headings. <h1> is the highest section level and <h6> is the lowest.</p>',
        'source': `<h1>Heading level 1</h1>
            <h2>Heading level 2</h2>
            <h3>Heading level 3</h3>
            <h4>Heading level 4</h4>
            <h5>Heading level 5</h5>
            <h6>Heading level 6</h6>`,
        'output': 'true',
        'type': 'sectioning',
        'ref': 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Heading_Elements'
    },
    {
        'tag': 'h2',
        'description': '<p>The HTML <h1>–<h6> elements represent six levels of section headings. <h1> is the highest section level and <h6> is the lowest.</p>',
        'source': `<h1>Heading level 1</h1>
            <h2>Heading level 2</h2>
            <h3>Heading level 3</h3>
            <h4>Heading level 4</h4>
            <h5>Heading level 5</h5>
            <h6>Heading level 6</h6>`,
        'output': 'true',
        'type': 'sectioning',
        'ref': 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Heading_Elements'
    },
    {
        'tag': 'h3',
        'description': '<p>The HTML <h1>–<h6> elements represent six levels of section headings. <h1> is the highest section level and <h6> is the lowest.</p>',
        'source': `<h1>Heading level 1</h1>
            <h2>Heading level 2</h2>
            <h3>Heading level 3</h3>
            <h4>Heading level 4</h4>
            <h5>Heading level 5</h5>
            <h6>Heading level 6</h6>`,
        'output': 'true',
        'type': 'sectioning',
        'ref': 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Heading_Elements'
    },
    {
        'tag': 'h4',
        'description': '<p>The HTML <h1>–<h6> elements represent six levels of section headings. <h1> is the highest section level and <h6> is the lowest.</p>',
        'source': `<h1>Heading level 1</h1>
            <h2>Heading level 2</h2>
            <h3>Heading level 3</h3>
            <h4>Heading level 4</h4>
            <h5>Heading level 5</h5>
            <h6>Heading level 6</h6>`,
        'output': 'true',
        'type': 'sectioning',
        'ref': 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Heading_Elements'
    },
    {
        'tag': 'h5',
        'description': '<p>The HTML <h1>–<h6> elements represent six levels of section headings. <h1> is the highest section level and <h6> is the lowest.</p>',
        'source': `<h1>Heading level 1</h1>
            <h2>Heading level 2</h2>
            <h3>Heading level 3</h3>
            <h4>Heading level 4</h4>
            <h5>Heading level 5</h5>
            <h6>Heading level 6</h6>`,
        'output': 'true',
        'type': 'sectioning',
        'ref': 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Heading_Elements'
    },
    {
        'tag': 'h6',
        'description': '<p>The HTML <h1>–<h6> elements represent six levels of section headings. <h1> is the highest section level and <h6> is the lowest.</p>',
        'source': `<h1>Heading level 1</h1>
            <h2>Heading level 2</h2>
            <h3>Heading level 3</h3>
            <h4>Heading level 4</h4>
            <h5>Heading level 5</h5>
            <h6>Heading level 6</h6>`,
        'output': 'true',
        'type': 'sectioning',
        'ref': 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Heading_Elements'
    },
    {
        'tag': 'blockquote',
        'description': '<p>The HTML <blockquote> Element (or HTML Block Quotation Element) indicates that the enclosed text is an extended quotation. Usually, this is rendered visually by indentation (see Notes for how to change it). A URL for the source of the quotation may be given using the cite attribute, while a text representation of the source can be given using the <cite> element.</p>',
        'source': `<blockquote cite="https://tools.ietf.org/html/rfc1149">
            <p>Avian carriers can provide high delay, low
            throughput, and low altitude service.  The
            connection topology is limited to a single
            point-to-point path for each carrier, used with
            standard carriers, but many carriers can be used
            without significant interference with each other,
            outside of early spring.  This is because of the 3D
            ether space available to the carriers, in contrast
            to the 1D ether used by IEEE802.3.  The carriers
            have an intrinsic collision avoidance system, which
            increases availability.</p>
        </blockquote>`,
        'output': 'true',
        'type': 'content',
        'ref': 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/blockquote'
    },
    {
        'tag': 'div',
        'description': '<p>The HTML Content Division element (<div>) is the generic container for flow content. It has no effect on the content or layout until styled using CSS.</p>',
        'source': '',
        'output': '',
        'type': 'content',
        'ref': 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/div'
    },
    {
        'tag': 'p',
        'description': '<p>The HTML <p> element represents a paragraph.</p>',
        'source': '',
        'output': '',
        'type': 'content',
        'ref': 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/p'
    },
    {
        'tag': 'ul',
        'description': '<p>The HTML <ul> element represents an unordered list of items, typically rendered as a bulleted list.</p>',
        'source': `<ul>
            <li>first item</li>
            <li>second item</li>
            <li>third item</li>
        </ul>`,
        'output': 'true',
        'type': 'content',
        'ref': 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ul'
    },
    {
        'tag': 'ol',
        'description': `<p>The HTML <ol> element represents an ordered list of items, typically rendered as a numbered list.</p>
        <h2>Attributes</h2>
        <dl>
            <dt>reversed</dt>
            <dd>This Boolean attribute specifies that the items of the list are specified in reversed order</dd>
            <dt>start</dt>
            <dd>This integer attribute specifies the start value for numbering the individual list items.</dd>
        </dl>`,
        'source': `<!-- simple ol -->
        <ol>
            <li>first item</li>
            <li>second item</li>
            <li>third item</li>
        </ol>
        <!-- Roman numeral type -->
        <ol type="i">
            <li>foo</li>
            <li>bar</li>
            <li>spam</li>
        </ol>
        <!-- start attribute -->
        <ol start="7">
            <li>first item</li>
            <li>second item</li>
            <li>third item</li>
        </ol>
        <!-- reversed attribute -->
        <ol reversed>
            <li>first item</li>
            <li>second item</li>
            <li>third item</li>
        </ol>`,
        'output': 'true',
        'type': 'content',
        'ref': 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ol'
    },
    {
        'tag': 'li',
        'description': `<p>The HTML <li> element is used to represent an item in a list.</p>
        <h2>Attributes</h2>
        <dl>
            <dt>value</dt>
            <dd>This integer attribute indicates the current ordinal value of the list item as defined by the <ol> element. The only allowed value for this attribute is a number, even if the list is displayed with Roman numerals or letters. List items that follow this one continue numbering from the value set. The value attribute has no meaning for unordered lists </dd>
        </dl>`,
        'source': `<ol type="I">
            <li value="3">third item</li>
            <li>fourth item</li>
            <li>fifth item</li>
        </ol>`,
        'output': 'true',
        'type': 'content',
        'ref': 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/li'
    },
    {
        'tag': 'dl',
        'description': '<p>The HTML <dl> element represents a description list. The element encloses a list of groups of terms (specified using the <dt> element) and descriptions (provided by <dd> elements). Common uses for this element are to implement a glossary or to display metadata (a list of key-value pairs).</p>',
        'source': `<dl>
            <dt>Firefox</dt>
            <dd>
            A free, open source, cross-platform,
            graphical web browser developed by the
            Mozilla Corporation and hundreds of
            volunteers.
            </dd>
        
            <!-- Other terms and descriptions -->
        </dl>`,
        'output': 'true',
        'type': 'content',
        'ref': 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dl'
    },
    {
        'tag': 'dt',
        'description': '<p>The HTML <dt> element specifies a term in a description or definition list, and as such must be used inside a <dl> element.</p>',
        'source': `<dl>
            <dt>Firefox</dt>
            <dd>
            A free, open source, cross-platform,
            graphical web browser developed by the
            Mozilla Corporation and hundreds of
            volunteers.
            </dd>
        
            <!-- Other terms and descriptions -->
        </dl>`,
        'output': 'true',
        'type': 'content',
        'ref': 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dt'
    },
    {
        'tag': 'dd',
        'description': '<p>The HTML <dd> element provides the details about or the definition of the preceding term (<dt>) in a description list (<dl>).</p>',
        'source': `<dl>
            <dt>Firefox</dt>
            <dd>
            A free, open source, cross-platform,
            graphical web browser developed by the
            Mozilla Corporation and hundreds of
            volunteers.
            </dd>
        
            <!-- Other terms and descriptions -->
        </dl>`,
        'output': 'true',
        'type': 'content',
        'ref': 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dd'
    },
    {
        'tag': 'figure',
        'description': `<p>The HTML <figure> (Figure With Optional Caption) element represents self-contained content, potentially with an optional caption, which is specified using the (<figcaption>) element.</p>
        <p>A caption can be associated with the <figure> element by inserting a <figcaption> inside it (as the first or the last child). The first <figcaption> element found in the figure is presented as the figure's caption.</p>`,
        'source': `<!-- Just an image -->
        <figure>
            <img src="../imgs/pos-fixed.png" alt="Fixed Box">
        </figure>
        
        <!-- Image with a caption -->
        <figure>
            <img src="../imgs/pos-fixed.png" alt="Fixed Box">
            <figcaption>Fixed Box</figcaption>
        </figure>`,
        'output': 'true',
        'type': 'content',
        'ref': 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/figure'
    },
    {
        'tag': 'figcaption',
        'description': '<p>The HTML <figcaption> or Figure Caption element represents a caption or legend describing the rest of the contents of its parent <figure> element.</p>',
        'source': `<figure>
            <img src="../imgs/pos-fixed.png" alt="Fixed Box">
            <figcaption>Fixed Box</figcaption>
        </figure>`,
        'output': 'true',
        'type': 'content',
        'ref': 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/figcaption'
    },
    {
        'tag': 'pre',
        'description': '<p>The HTML <pre> element represents preformatted text which is to be presented exactly as written in the HTML file.</p>',
        'source': `<p>Using CSS to change the font color is easy.</p>
        <pre>
        body {
            color: red;
        }
        </pre>`,
        'output': 'true',
        'type': 'content',
        'ref': 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/pre'
    },
    {
        'tag': 'hr',
        'description': '<p>The HTML <hr> element represents a thematic break between paragraph-level elements: for example, a change of scene in a story, or a shift of topic within a section.</p>',
        'source': `<p>
            This is the first paragraph of text.
            This is the first paragraph of text.
            This is the first paragraph of text.
            This is the first paragraph of text.
        </p>
        <hr>
        <p>
            This is the second paragraph of text.
            This is the second paragraph of text.
            This is the second paragraph of text.
            This is the second paragraph of text.
        </p>`,
        'output': 'true',
        'type': 'content',
        'ref': 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/hr'
    },
    {
        'tag': 'a',
        'description': `<p>The HTML <a> element (or anchor element), along with it&apos;s href attribute, creates a hyperlink to other web pages, files, locations within the same page, email addresses, or any other URL.</p>
        <h2>Attributes</h2>
        <dl>
            <dt>download</dt>
            <dd>
                <p>This attribute instructs browsers to download a URL instead of navigating to it, so the user will be prompted to save it as a local file. If the attribute has a value, it is used as the pre-filled file name in the Save prompt (the user can still change the file name if they want). There are no restrictions on allowed values, though / and \ are converted to underscores. Most file systems limit some punctuation in file names, and browsers will adjust the suggested name accordingly.</p>
                <ul>
                    <li>This attribute only works for same-origin URLs.</li>
                    <li>Although HTTP(s) URLs need to be in the same-origin, blob: URLs and data: URLs are allowed so that content generated by JavaScript, such as pictures created in an image-editor Web app, can be downloaded.</li>
                    <li>If the HTTP header Content-Disposition: gives a different filename than this attribute, the HTTP header takes priority over this attribute.</li>
                    <li>If Content-Disposition: is set to inline, Firefox prioritizes Content-Disposition, like the filename case, while Chrome prioritizes the download attribute.</li>
                </ul>
            </dd>
            <dt>href</dt>
            <dd>Contains a URL or a URL fragment that the hyperlink points to. URLs are not restricted to Web (HTTP)-based documents, but can use any protocol supported by the browser. A URL fragment is a name preceded by a hash mark (#), which specifies an internal target location (an id of an HTML element) within the current document.</dd>
            <dt>hreflang</dt>
            <dd>This attribute indicates the human language of the linked resource. It is purely advisory, with no built-in functionality.</dd>
            <dt>ping</dt>
            <dd>Contains a space-separated list of URLs to which, when the hyperlink is followed, POST requests with the body PING will be sent by the browser (in the background). Typically used for tracking.</dd>
            <dt>rel</dt>
            <dd>Specifies the relationship of the target object to the link object. The value is a space-separated list of link types.</dd>
            <dt>target</dt>
            <dd>
                <p>Specifies where to display the linked URL. It is a name of, or keyword for, a browsing context: a tab, window, or <iframe>. The following keywords have special meanings:</p>
                <ul>
                    <li><code>_self</code>: Load the URL into the same browsing context as the current one. This is the default behavior.</li>
                    <li><code>_blank</code>: Load the URL into a new browsing context. This is usually a tab, but users can configure browsers to use new windows instead.</li>
                    <li><code>_parent</code>: Load the URL into the parent browsing context of the current one. If there is no parent, this behaves the same way as _self.</li>
                    <li><code>_top</code>: Load the URL into the top-level browsing context (that is, the "highest" browsing context that is an ancestor of the current one, and has no parent). If there is no parent, this behaves the same way as _self.</li>
                </ul>
            </dd>
            <dt>type</dt>
            <dd>Specifies the media type in the form of a MIME type for the linked URL. It is purely advisory, with no built-in functionality.</dd>
        </dl>`,
        'source': `<!-- external link -->
        <a href="https://www.mozilla.com/">External Link</a>
        <!-- links to element on this page with id="attr-href" -->
        <a href="#attr-href">Description of Same-Page Links</a>
        <!-- email -->
        <a href="mailto:nowhere@mozilla.org">Send email to nowhere</a>
        <!-- phone -->
        <a href="tel:+491570156">+49 157 0156</a>`,
        'output': 'true',
        'type': 'semantics',
        'ref': 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a'
    },
    {
        'tag': 'abbr',
        'description': '<p>The HTML Abbreviation element (<abbr>) represents an abbreviation or acronym; the optional title attribute can provide an expansion or description for the abbreviation.</p>',
        'source': `<p>You can use <abbr title="Cascading Style Sheets">CSS</abbr> to style your <abbr title="HyperText Markup Language">HTML</abbr>.</p>`,
        'output': 'true',
        'type': 'semantics',
        'ref': 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/abbr'
    },
    {
        'tag': 'b',
        'description': '<p>The HTML Bring Attention To element (<b>)  is used to draw the reader&apos;s attention to the element&apos;s contents, which are not otherwise granted special importance.</p>',
        'source': '<p><b>Text</b> that needs attention.</p>',
        'output': 'true',
        'type': 'semantics',
        'ref': 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/b'
    },
    {
        'tag': 'bdi',
        'description': '<p>The HTML Bidirectional Isolate element (<bdi>)  tells the browser&apos;s bidirectional algorithm to treat the text it contains in isolation from its surrounding text.</p>',
        'source': '',
        'output': '',
        'type': 'semantics',
        'ref': 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/bdi'
    },
    {
        'tag': 'bdo',
        'description': '<p>The HTML Bidirectional Text Override element (<bdo>) overrides the current directionality of text, so that the text within is rendered in a different direction.</p>',
        'source': '',
        'output': '',
        'type': 'semantics',
        'ref': 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/bdo'
    },
    {
        'tag': 'br',
        'description': '<p>The HTML <br> element produces a line break in text (carriage-return). It is useful for writing a poem or an address, where the division of lines is significant.</p>',
        'source': `Mozilla<br>
        331 E. Evelyn Avenue<br>
        Mountain View, CA<br>
        94041<br>
        USA<br>`,
        'output': 'true',
        'type': 'semantics',
        'ref': 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/br'
    },
    {
        'tag': 'cite',
        'description': '<p>The HTML Citation element (<cite>) is used to describe a reference to a cited creative work, and must include the title of that work.</p>',
        'source': '<p>More information can be found in <cite>[ISO-0000]</cite>.</p>',
        'output': 'true',
        'type': 'semantics',
        'ref': 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/cite'
    },
    {
        'tag': 'code',
        'description': '<p>The HTML <code> element displays its contents styled in a fashion intended to indicate that the text is a short fragment of computer code.</p>',
        'source': `<p>The function <code>selectAll()</code> highlights all the text in the input field so the user can, for example, copy or delete the text.</p>`,
        'output': 'true',
        'type': 'semantics',
        'ref': 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/code'
    },
    {
        'tag': 'data',
        'description': `<p>The HTML <data> element links a given content with a machine-readable translation. If the content is time- or date-related, the <time> element must be used.</p>
        <h2>Attributes</h2>
        <dl>
            <dt>value</dt>
            <dd>This attribute specifies the machine-readable translation of the content of the element.</dd>
        </dl>`,
        'source': `<p>New Products</p>
        <ul>
            <li><data value="398">Mini Ketchup</data></li>
            <li><data value="399">Jumbo Ketchup</data></li>
            <li><data value="400">Mega Jumbo Ketchup</data></li>
        </ul>`,
        'output': 'true',
        'type': 'semantics',
        'ref': 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/data'
    },
    {
        'tag': 'dfn',
        'description': '<p>The HTML Definition element (<dfn>) is used to indicate the term being defined within the context of a definition phrase or sentence.</p>',
        'source': '',
        'output': '',
        'type': 'semantics',
        'ref': 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dfn'
    },
    {
        'tag': 'em',
        'description': '<p>The HTML <em> element marks text that has stress emphasis. The <em> element can be nested, with each level of nesting indicating a greater degree of emphasis.</p>',
        'source': `<p>
            In HTML 5, what was previously called
            <em>block-level</em> content is now called
            <em>flow</em> content.
        </p>`,
        'output': 'true',
        'type': 'semantics',
        'ref': 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/em'
    },
    {
        'tag': 'i',
        'description': '<p>The HTML <i> element represents a range of text that is set off from the normal text for some reason. Some examples include technical terms, foreign language phrases, or fictional character thoughts. It is typically displayed in italic type.</p>',
        'source': '<p>The Latin phrase <i class="latin">Veni, vidi, vici</i> is often mentioned in music, art, and literature.</p>',
        'output': 'true',
        'type': 'semantics',
        'ref': 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/i'
    },
    {
        'tag': 'kbd',
        'description': `<p>The HTML Keyboard Input element (<kbd>) represents a span of inline text denoting textual user input from a keyboard, voice input, or any other text entry device.</p>
        <p>To describe an input comprised of multiple keystrokes, nest multiple &lt;kbd&gt; elements, with an outer &lt;kbd&gt; element representing the overall input and each individual keystroke or component of the input enclosed within its own &lt;kbd&gt;.</p>`,
        'source': `<p>You can also create a new document using the keyboard shortcut <kbd><kbd>Ctrl</kbd>+<kbd>N</kbd></kbd>.</p>`,
        'output': 'true',
        'type': 'semantics',
        'ref': 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/kbd'
    },
    {
        'tag': 'mark',
        'description': '<p>The HTML Mark Text element (<mark>) represents text which is marked or highlighted for reference or notation purposes, due to the marked passage&apos;s relevance or importance in the enclosing context.</p>',
        'source': '',
        'output': '',
        'type': 'semantics',
        'ref': ''
    },
    {
        'tag': 'q',
        'description': '<p>The HTML <q> element indicates that the enclosed text is a short inline quotation. Most modern browsers implement this by surrounding the text in quotation marks.</p>',
        'source': '',
        'output': '',
        'type': 'semantics',
        'ref': ''
    },
    {
        'tag': 'rb',
        'description': '<p>The HTML Ruby Base (<rb>) element is used to delimit the base text component of a  <ruby> annotation, i.e. the text that is being annotated.</p>',
        'source': '',
        'output': '',
        'type': 'semantics',
        'ref': ''
    },
    {
        'tag': 'rp',
        'description': '<p>The HTML Ruby Fallback Parenthesis (<rp>) element is used to provide fall-back parentheses for browsers that do not support display of ruby annotations using the <ruby> element.</p>',
        'source': '',
        'output': '',
        'type': 'semantics',
        'ref': ''
    },
    {
        'tag': 'rt',
        'description': '<p>The HTML Ruby Text (<rt>) element specifies the ruby text component of a ruby annotation, which is used to provide pronunciation, translation, or transliteration information for East Asian typography. The <rt> element must always be contained within a <ruby> element.</p>',
        'source': '',
        'output': '',
        'type': 'semantics',
        'ref': ''
    },
    {
        'tag': 'rtc',
        'description': '<p>The HTML Ruby Text Container (<rtc>) element embraces semantic annotations of characters presented in a ruby of <rb> elements used inside of <ruby> element. <rb> elements can have both pronunciation (<rt>) and semantic (<rtc>) annotations.</p>',
        'source': '',
        'output': '',
        'type': 'semantics',
        'ref': ''
    },
    {
        'tag': 'ruby',
        'description': '<p>The HTML <ruby> element represents a ruby annotation. Ruby annotations are for showing pronunciation of East Asian characters.</p>',
        'source': '',
        'output': '',
        'type': 'semantics',
        'ref': ''
    },
    {
        'tag': 's',
        'description': '<p>The HTML <s> element renders text with a strikethrough, or a line through it. Use the <s> element to represent things that are no longer relevant or no longer accurate. However, <s> is not appropriate when indicating document edits; for that, use the <del> and <ins> elements, as appropriate.</p>',
        'source': '',
        'output': '',
        'type': 'semantics',
        'ref': ''
    },
    {
        'tag': 'samp',
        'description': '<p>The HTML Sample Element (<samp>) is used to enclose inline text which represents sample (or quoted) output from a computer program.</p>',
        'source': '',
        'output': '',
        'type': 'semantics',
        'ref': ''
    },
    {
        'tag': 'small',
        'description': '<p>The HTML <small> element represents side-comments and small print, like copyright and legal text, independent of its styled presentation. By default, it renders text within it one font-size small, such as from small to x-small.</p>',
        'source': '',
        'output': '',
        'type': 'semantics',
        'ref': ''
    },
    {
        'tag': 'span',
        'description': '<p>The HTML <span> element is a generic inline container for phrasing content, which does not inherently represent anything. It can be used to group elements for styling purposes (using the class or id attributes), or because they share attribute values, such as lang.</p>',
        'source': '',
        'output': '',
        'type': 'semantics',
        'ref': ''
    },
    {
        'tag': 'strong',
        'description': '<p>The HTML Strong Importance Element (<strong>) indicates that its contents have strong importance, seriousness, or urgency. Browsers typically render the contents in bold type.</p>',
        'source': '',
        'output': '',
        'type': 'semantics',
        'ref': ''
    },
    {
        'tag': 'sub',
        'description': '<p>The HTML Subscript element (<sub>) specifies inline text which should be displayed as subscript for solely typographical reasons.</p>',
        'source': '',
        'output': '',
        'type': 'semantics',
        'ref': ''
    },
    {
        'tag': 'sup',
        'description': '<p>The HTML Superscript element (<sup>) specifies inline text which is to be displayed as superscript for solely typographical reasons.</p>',
        'source': '',
        'output': '',
        'type': 'semantics',
        'ref': ''
    },
    {
        'tag': 'time',
        'description': '<p>The HTML <time> element represents a specific period in time.</p>',
        'source': '',
        'output': '',
        'type': 'semantics',
        'ref': ''
    },
    {
        'tag': 'tt',
        'description': '<p>The obsolete HTML Teletype Text element (<tt>) creates inline text which is presented using the user agent&apos;s default monospace font face.</p>',
        'source': '',
        'output': '',
        'type': 'semantics',
        'ref': ''
    },
    {
        'tag': 'u',
        'description': '<p>The HTML Unarticulated Annotation Element (<u>) represents a span of inline text which should be rendered in a way that indicates that it has a non-textual annotation.</p>',
        'source': '',
        'output': '',
        'type': 'semantics',
        'ref': ''
    },
    {
        'tag': 'var',
        'description': '<p>The HTML Variable element (<var>) represents the name of a variable in a mathematical expression or a programming context.</p>',
        'source': '',
        'output': '',
        'type': 'semantics',
        'ref': ''
    },
    {
        'tag': 'wbr',
        'description': '<p>The HTML <wbr> element represents a word break opportunity—a position within text where the browser may optionally break a line, though its line-breaking rules would not otherwise create a break at that location.</p>',
        'source': '',
        'output': '',
        'type': 'semantics',
        'ref': ''
    },
    {
        'tag': 'area',
        'description': '<p>The HTML <area> element defines a hot-spot region on an image, and optionally associates it with a hypertext link. This element is used only within a <map> element.</p>',
        'source': '',
        'output': '',
        'type': ''
    },
    {
        'tag': 'audio',
        'description': '<p>The HTML <audio> element is used to embed sound content in documents. It may contain one or more audio sources, represented using the src attribute or the <source> element: the browser will choose the most suitable one. It can also be the destination for streamed media, using a MediaStream.</p>',
        'source': '',
        'output': '',
        'type': ''
    },
    {
        'tag': 'img',
        'description': '<p>The HTML <img> element embeds an image into the document. It is a replaced element.</p>',
        'source': '',
        'output': '',
        'type': ''
    },
    {
        'tag': 'map',
        'description': '<p>The HTML <map> element is used with <area> elements to define an image map (a clickable link area).</p>',
        'source': '',
        'output': '',
        'type': ''
    },
    {
        'tag': 'track',
        'description': '<p>The HTML <track> element is used as a child of the media elements <audio> and <video>. It lets you specify timed text tracks (or time-based data), for example to automatically handle subtitles. The tracks are formatted in WebVTT format (.vtt files) — Web Video Text Tracks or Timed Text Markup Language (TTML).</p>',
        'source': '',
        'output': '',
        'type': ''
    },
    {
        'tag': 'video',
        'description': '<p>The HTML Video element (<video>) embeds a media player which supports video playback into the document.</p>',
        'source': '',
        'output': '',
        'type': ''
    },
    {
        'tag': 'applet',
        'description': '<p>The obsolete HTML Applet Element (<applet>) embeds a Java applet into the document; this element has been deprecated in favor of <object>.</p>',
        'source': '',
        'output': '',
        'type': ''
    },
    {
        'tag': 'embed',
        'description': '<p>The HTML <embed> element embeds external content at the specified point in the document. This content is provided by an external application or other source of interactive content such as a browser plug-in.</p>',
        'source': '',
        'output': '',
        'type': ''
    },
    {
        'tag': 'iframe',
        'description': '<p>The HTML Inline Frame element (<iframe>) represents a nested browsing context, embedding another HTML page into the current one.</p>',
        'source': '',
        'output': '',
        'type': ''
    },
    {
        'tag': 'noembed',
        'description': '<p>The <noembed> element is an obsolete, non-standard way to provide alternative, or "fallback", content for browsers that do not support the <embed> element or do not support the type of embedded content an author wishes to use.</p>',
        'source': '',
        'output': '',
        'type': ''
    },
    {
        'tag': 'object',
        'description': '<p>The HTML <object> element represents an external resource, which can be treated as an image, a nested browsing context, or a resource to be handled by a plugin.</p>',
        'source': '',
        'output': '',
        'type': ''
    },
    {
        'tag': 'param',
        'description': '<p>The HTML <param> element defines parameters for an <object> element.</p>',
        'source': '',
        'output': '',
        'type': ''
    },
    {
        'tag': 'picture',
        'description': '<p>The HTML <picture> element contains zero or more <source> elements and one <img> element to provide versions of an image for different display/device scenarios.</p>',
        'source': '',
        'output': '',
        'type': ''
    },
    {
        'tag': 'source',
        'description': '<p>The HTML <source> element specifies multiple media resources for the <picture>, the <audio> element, or the <video> element.</p>',
        'source': '',
        'output': '',
        'type': ''
    },
    {
        'tag': 'canvas',
        'description': '<p>Use the HTML <canvas> element with either the canvas scripting API or the WebGL API to draw graphics and animations.</p>',
        'source': '',
        'output': '',
        'type': ''
    },
    {
        'tag': 'noscript',
        'description': '<p>The HTML <noscript> element defines a section of HTML to be inserted if a script type on the page is unsupported or if scripting is currently turned off in the browser.</p>',
        'source': '',
        'output': '',
        'type': ''
    },
    {
        'tag': 'script',
        'description': '<p>The HTML <script> element is used to embed or reference executable code; this is typically used to embed or refer to JavaScript code.</p>',
        'source': '',
        'output': '',
        'type': ''
    },
    {
        'tag': 'del',
        'description': '<p>The HTML <del> element represents a range of text that has been deleted from a document.</p>',
        'source': '',
        'output': '',
        'type': ''
    },
    {
        'tag': 'ins',
        'description': '<p>The HTML <ins> element represents a range of text that has been added to a document.</p>',
        'source': '',
        'output': '',
        'type': ''
    },
    {
        'tag': 'caption',
        'description': '<p>The HTML Table Caption element (<caption>) specifies the caption (or title) of a table, and if used is always the first child of a <table>.</p>',
        'source': '',
        'output': '',
        'type': ''
    },
    {
        'tag': 'col',
        'description': '<p>The HTML <col> element defines a column within a table and is used for defining common semantics on all common cells. It is generally found within a <colgroup> element.</p>',
        'source': '',
        'output': '',
        'type': ''
    },
    {
        'tag': 'colgroup',
        'description': '<p>The HTML <colgroup> element defines a group of columns within a table.</p>',
        'source': '',
        'output': '',
        'type': ''
    },
    {
        'tag': 'table',
        'description': '<p>The HTML <table> element represents tabular data — that is, information presented in a two-dimensional table comprised of rows and columns of cells containing data.</p>',
        'source': '',
        'output': '',
        'type': ''
    },
    {
        'tag': 'tbody',
        'description': '<p>The HTML Table Body element (<tbody>) encapsulates a set of table rows (<tr> elements), indicating that they comprise the body of the table (<table>).</p>',
        'source': '',
        'output': '',
        'type': ''
    },
    {
        'tag': 'td',
        'description': '<p>The HTML <td> element defines a cell of a table that contains data. It participates in the table model.</p>',
        'source': '',
        'output': '',
        'type': ''
    },
    {
        'tag': 'tfoot',
        'description': '<p>The HTML <tfoot> element defines a set of rows summarizing the columns of the table.</p>',
        'source': '',
        'output': '',
        'type': ''
    },
    {
        'tag': 'th',
        'description': '<p>The HTML <th> element defines a cell as header of a group of table cells. The exact nature of this group is defined by the scope and headers attributes.</p>',
        'source': '',
        'output': '',
        'type': ''
    },
    {
        'tag': 'thead',
        'description': '<p>The HTML <thead> element defines a set of rows defining the head of the columns of the table.</p>',
        'source': '',
        'output': '',
        'type': ''
    },
    {
        'tag': 'tr',
        'description': '<p>The HTML <tr> element defines a row of cells in a table. The row&apos;s cells can then be established using a mix of <td> (data cell) and <th> (header cell) elements.</p>',
        'source': '',
        'output': '',
        'type': ''
    },
    {
        'tag': 'button',
        'description': '<p>The HTML <button> element represents a clickable button, which can be used in forms or anywhere in a document that needs simple, standard button functionality.</p>',
        'source': '',
        'output': '',
        'type': ''
    },
    {
        'tag': 'datalist',
        'description': '<p>The HTML <datalist> element contains a set of <option> elements that represent the values available for other controls.</p>',
        'source': '',
        'output': '',
        'type': ''
    },
    {
        'tag': 'fieldset',
        'description': '<p>The HTML <fieldset> element is used to group several controls as well as labels (<label>) within a web form.</p>',
        'source': '',
        'output': '',
        'type': ''
    },
    {
        'tag': 'form',
        'description': '<p>The HTML <form> element represents a document section that contains interactive controls for submitting information to a web server.</p>',
        'source': '',
        'output': '',
        'type': ''
    },
    {
        'tag': 'input',
        'description': '<p>The HTML <input> element is used to create interactive controls for web-based forms in order to accept data from the user; a wide variety of types of input data and control widgets are available, depending on the device and user agent.</p>',
        'source': '',
        'output': '',
        'type': ''
    },
    {
        'tag': 'label',
        'description': '<p>The HTML <label> element represents a caption for an item in a user interface.</p>',
        'source': '',
        'output': '',
        'type': ''
    },
    {
        'tag': 'legend',
        'description': '<p>The HTML <legend> element represents a caption for the content of its parent <fieldset>.</p>',
        'source': '',
        'output': '',
        'type': ''
    },
    {
        'tag': 'meter',
        'description': '<p>The HTML <meter> element represents either a scalar value within a known range or a fractional value.</p>',
        'source': '',
        'output': '',
        'type': ''
    },
    {
        'tag': 'optgroup',
        'description': '<p>The HTML <optgroup> element creates a grouping of options within a <select> element.</p>',
        'source': '',
        'output': '',
        'type': ''
    },
    {
        'tag': 'option',
        'description': '<p>The HTML <option> element is used to define an item contained in a <select>, an <optgroup>, or a <datalist> element. As such, <option> can represent menu items in popups and other lists of items in an HTML document.</p>',
        'source': '',
        'output': '',
        'type': ''
    },
    {
        'tag': 'output',
        'description': '<p>The HTML Output element (<output>) is a container element into which a site or app can inject the results of a calculation or the outcome of a user action.</p>',
        'source': '',
        'output': '',
        'type': ''
    },
    {
        'tag': 'progress',
        'description': '<p>The HTML <progress> element displays an indicator showing the completion progress of a task, typically displayed as a progress bar.</p>',
        'source': '',
        'output': '',
        'type': ''
    },
    {
        'tag': 'select',
        'description': '<p>The HTML <select> element represents a control that provides a menu of options</p>',
        'source': '',
        'output': '',
        'type': ''
    },
    {
        'tag': 'textarea',
        'description': '<p>The HTML <textarea> element represents a multi-line plain-text editing control, useful when you want to allow users to enter a sizeable amount of free-form text, for example a comment on a review or feedback form.</p>',
        'source': '',
        'output': '',
        'type': ''
    },
    {
        'tag': 'details',
        'description': '<p>The HTML Details Element (<details>) creates a disclosure widget in which information is visible only when the widget is toggled into an "open" state.</p>',
        'source': '',
        'output': '',
        'type': ''
    },
    {
        'tag': 'dialog',
        'description': '<p>The HTML <dialog> element represents a dialog box or other interactive component, such as an inspector or window.</p>',
        'source': '',
        'output': '',
        'type': ''
    },
    {
        'tag': 'menu',
        'description': '<p>The HTML <menu> element represents a group of commands that a user can perform or activate. This includes both list menus, which might appear across the top of a screen, as well as context menus, such as those that might appear underneath a button after it has been clicked.</p>',
        'source': '',
        'output': '',
        'type': ''
    },
    {
        'tag': 'menuitem',
        'description': '<p>The HTML <menuitem> element represents a command that a user is able to invoke through a popup menu. This includes context menus, as well as menus that might be attached to a menu button.</p>',
        'source': '',
        'output': '',
        'type': ''
    },
    {
        'tag': 'summary',
        'description': '<p>The HTML Disclosure Summary element (<summary>) element specifies a summary, caption, or legend for a <details> element&apos;s disclosure box.</p>',
        'source': '',
        'output': '',
        'type': ''
    },
    {
        'tag': 'content',
        'description': '<p>The HTML <content> element—an obsolete part of the Web Components suite of technologies—was used inside of Shadow DOM as an insertion point, and wasn&apos;t meant to be used in ordinary HTML.</p>',
        'source': '',
        'output': '',
        'type': ''
    },
    {
        'tag': 'element',
        'description': '<p>The obsolete HTML <element> element was part of the Web Components specification; it was intended to be used to define new custom DOM elements.</p>',
        'source': '',
        'output': '',
        'type': ''
    },
    {
        'tag': 'shadow',
        'description': '<p>The HTML <shadow> element—an obsolete part of the Web Components technology suite—was intended to be used as a shadow DOM insertion point.</p>',
        'source': '',
        'output': '',
        'type': ''
    },
    {
        'tag': 'slot',
        'description': '<p>The HTML <slot> element—part of the Web Components technology suite—is a placeholder inside a web component that you can fill with your own markup, which lets you create separate DOM trees and present them together.</p>',
        'source': '',
        'output': '',
        'type': ''
    },
    {
        'tag': 'template',
        'description': '<p>The HTML Content Template (<template>) element is a mechanism for holding HTML that is not to be rendered immediately when a page is loaded but may be instantiated subsequently during runtime using JavaScript.</p>',
        'source': '',
        'output': '',
        'type': ''
    },
];