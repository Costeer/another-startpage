/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {"/":"/","deepl":"https://deepl.com/","reddit":"https://reddit.com/","maps":"https://maps.google.com/"}
const engine = "duckduckgo"
const engineUrls = {
  deepl: "https://www.deepl.com/translator#-/-/{query}",
  duckduckgo: "https://duckduckgo.com/?q={query}",
  ecosia: "https://www.ecosia.org/search?q={query}",
  google: "https://www.google.com/search?q={query}",
  startpage: "https://www.startpage.com/search?q={query}",
  youtube: "https://www.youtube.com/results?q={query}",
}

const isWebUrl = value => {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

const getTargetUrl = value => {
  if (isWebUrl(value)) return value
  if (lookup[value]) return lookup[value]
  const url = engineUrls[engine] ?? engine
  return url.replace("{query}", value)
}

const search = () => {
  const value = searchInput.value
  const targetUrl = getTargetUrl(value)
  window.open(targetUrl, "_self")
}

searchInput.onkeyup = event => event.key === "Enter" && search()
searchButton.onclick = search

/**
 * inject bookmarks into html
 */

const bookmarks = [{"id":"1LwzfX4CTSfLQCLo","label":"Cill","bookmarks":[{"id":"3maZI96JVrvj0DXb","label":"❯ ~/youtube","url":"https://www.youtube.com/"},{"id":"enqs2WzcFETlCD0P","label":"❯ ~/reddit","url":"https://www.reddit.com/"},{"id":"bW09UMFDbxlaaUyj","label":"❯ ~/ani/cloud","url":"https://aniworld.to/"},{"id":"j5VdsTuEMMx7WZza","label":"❯ ~/hurawatch","url":"https://hurawatch.bz/home"}]},{"id":"t74bDcJ9vOeXv7Ty","label":"Design","bookmarks":[{"id":"9jwDLKM5BaKbQTCx","label":"❯ ~/colorhunt","url":"https://colorhunt.co/"},{"id":"FqYW54LYO828Y0pR","label":"❯ ~/hues-happy","url":"https://www.happyhues.co/"},{"id":"yqEddNducEww8WYO","label":"❯ ~/backdrop-gen","url":"https://app.haikei.app/"},{"id":"oeQmKzPwSw0Gv7Ti","label":"❯ ~/terminal.sexy","url":"https://terminal.sexy/"}]},{"id":"yq20FGpr8UgByPKu","label":"Dev","bookmarks":[{"id":"dVyZY9pQmwTboIqR","label":"❯ ~/gruvbox/themes","url":"https://github.com/Costeer/Gruvbox-Material-Themes"},{"id":"B0jBHxW0P6aZYd75","label":"❯ ~/git/lab","url":"https://reactjs.org/docs/getting-started.html"},{"id":"B5sjCZfkwOEjRVJu","label":"❯ ~/hactricks","url":"https://book.hacktricks.xyz/welcome/readme"},{"id":"jvD0l3YeLuNfXdYV","label":"❯ ~/nexus","url":"https://www.nexusmods.com/"}]},{"id":"seEnQ2OZRpDm02uP","label":"/Home","bookmarks":[{"id":"qaPadO5domD5H6yS","label":"❯ ~/cloud","url":"https://drive.google.com/drive/my-drive"},{"id":"R8UovOUR58Un21Eg","label":"❯ ~/docs","url":"https://nobaraproject.org/docs/"},{"id":"7VE9HmA6J8o36lMg","label":"❯ neofetch","url":"https://github.com/Costeer/Gruvbox-Material-Themes/blob/main/neofetch-nitch.txt"}]}]

const createGroupContainer = () => {
  const container = document.createElement("div")
  container.className = "bookmark-group"
  return container
}

const createGroupTitle = title => {
  const h2 = document.createElement("h2")
  h2.innerHTML = title
  return h2
}

const createBookmark = ({ label, url }) => {
  const li = document.createElement("li")
  const a = document.createElement("a")
  a.href = url
  a.innerHTML = label
  li.append(a)
  return li
}

const createBookmarkList = bookmarks => {
  const ul = document.createElement("ul")
  bookmarks.map(createBookmark).forEach(li => ul.append(li))
  return ul
}

const createGroup = ({ label, bookmarks }) => {
  const container = createGroupContainer()
  const title = createGroupTitle(label)
  const bookmarkList = createBookmarkList(bookmarks)
  container.append(title)
  container.append(bookmarkList)
  return container
}

const injectBookmarks = () => {
  const bookmarksContainer = document.getElementById("bookmarks")
  bookmarksContainer.append()
  bookmarks.map(createGroup).forEach(group => bookmarksContainer.append(group))
}

injectBookmarks()
