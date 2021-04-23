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
    get: 'font-weight:700',
  },
  {
    title: "italic",
    selector: ".ri-italic",
    key: "i",
    get: 'font-style:italic',
  },
  {
    title: "underline",
    selector: ".ri-underline",
    key: "u",
    get: 'text-decoration:underline',
  },
  {
    title: "strikethrough",
    selector: ".ri-strikethrough",
    key: "é",
    get: 'text-decoration:line-through',
  },
  {
    title: "code",
    key: "e",
    selector: ".ri-code-fill",
    get: 'font-family:monospace; overflow-wrap: break-word',
  },
  {
    title: "color 1",
    key: "j",
    get: `color:rgb(255, 56, 96)`,
  },
  {
    title: "color 2",
    key: "k",
    get: `color:rgb(21, 177, 104)`,
  },
  {
    title: "color 3",
    key: "l",
    get: `color:rgb(4, 76, 211)`,
  },
  {
    title: "color 4",
    key: "m",
    get: `color:rgb(250, 173, 29)`,
  },
  {
    title: "color indice subscript",
    key: "o",
    selector: ".ri-subscript",
    get: `vertical-align:sub; font-size: 0.7em`,
  },
  {
    title: "color exposant superscript",
    key: "d",
    selector: ".ri-superscript",
    get: `vertical-align:super; font-size: 0.7em`,
  },
];
