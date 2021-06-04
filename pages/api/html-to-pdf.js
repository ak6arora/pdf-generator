import Formidable from 'formidable';
import fs from 'fs';
import HtmlToPdf from 'html-to-pdf';

export const config = {
  api: {
    bodyParser: false,
  },
}

export default (req, res) => {
  if (req.method === 'POST') {
    const form = Formidable({ multiples: true });
    form.parse(req, (err, fields, files) => {
      const file = fs.readFileSync(files.file.path, { encoding: 'utf-8'});
      HtmlToPdf.convertHTMLString(file, 'test.pdf', (error, success) => {
        if (error) {
          res.status(500).json({ error })
        } else {
          console.log("Success!", new Date());
          res.send(fs.readFileSync('test.pdf'));
        }
      })
    });
  } else {
    res.status(405).json({ error: "This method is not supported" })
  }
}
