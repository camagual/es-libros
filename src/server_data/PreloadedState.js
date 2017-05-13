const testState = {
  user: "gabriel",
  bookIndex: [
    {
      "name":"Harry Potter y la Piedra Filosofal",
      "author":"J.K. Rowling",
      "year":1997,
      "chapters": [
        "El niño que vivió",
        "El vidrio que se rompió"
      ]
    }
  ],
  lyricsIndex: [
    {
      "name":"Labios de Miel",
      "artist":"Luis Miguel",
      "youtube":"https://www.youtube.com/embed/7QdVFQhkL8g"
    },
    {
      "name":"Labios de Miel",
      "artist":"Luis Miguel",
      "youtube":"https://www.youtube.com/embed/7QdVFQhkL8g"
    }
  ],
  bookmarks: {},
}

const serverRenderedState = window.__PRELOADED_STATE__

if (serverRenderedState)
  module.exports = serverRenderedState
else
  module.exports = testState
