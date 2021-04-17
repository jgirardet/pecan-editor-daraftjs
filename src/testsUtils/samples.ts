export const sample_headers = `
<h1>header1</h1>
<h2>Header 2</h2>
<h3>Header 3</h3>
<h4>Header 4</h4>
`;

export const sample_inline = `
<p>NORMAL : Le Lorem Ipsum est simplement du faux texte employé  </p>
<P><B >GRAS: Le Lorem Ipsum est simplement du faux texte employé  </B></p>
<P><I >Italic: Le Lorem Ipsum est simplement du faux texte employé  </I></p>
<P><U >Souligné: Le Lorem Ipsum est simplement du faux texte employé  </U></p>
<P><code >code: Le Lorem Ipsum est simplement du faux texte employé  </code></p>
`;

export const inlinestyles = [
  {
    title: "bold",
    selector: ".ri-bold",
    key: "b",
    get: '[style="font-weight: bold;"]',
  },
  {
    title: "italic",
    selector: ".ri-italic",
    key: "i",
    get: '[style="font-style: italic;"]',
  },
  {
    title: "underline",
    selector: ".ri-underline",
    key: "u",
    get: '[style="text-decoration: underline;"]',
  },
  {
    title: "strikethrough",
    selector: ".ri-strikethrough",
    key: "é",
    get: '[style="text-decoration: line-through;"]',
  },
  {
    title: "code",
    key: "e",
    selector: ".ri-code-fill",
    get: '[style="font-family: monospace; overflow-wrap: break-word;"]',
  },
  {
    title: "color 1",
    key: "j",
    get: `[style="color: rgb(255, 56, 96);"]`,
  },
  {
    title: "color 2",
    key: "k",
    get: `[style="color: rgb(21, 177, 104);"]`,
  },
  {
    title: "color 3",
    key: "l",
    get: `[style="color: rgb(4, 76, 211);"]`,
  },
  {
    title: "color 4",
    key: "m",
    get: `[style="color: rgb(250, 173, 29);"]`,
  },
];