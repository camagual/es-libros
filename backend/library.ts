import * as fs from "fs";
import * as path from "path";

const bookPath = __dirname + '/books'

export const readChapter = (bookId: number, chapterIndex: number,
  callback: (err: NodeJS.ErrnoException, data: Buffer) => void) => {
    const filepath = `${bookPath}/${bookId}/${chapterIndex}.md`
    fs.readFile(filepath, callback)
}
