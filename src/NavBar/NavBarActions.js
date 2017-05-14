import React from 'react';
import { Link } from 'react-router-dom'
import Bookmark from 'react-icons/lib/md/bookmark';
import Settings from 'react-icons/lib/md/settings';

import { computeScrollFraction } from '../dom/Scroll.js'
import { addBookmark, unauthorizedResponseHandler } from '../api.js'
import { addBookmark as addBookmarkMutation } from '../server_data/PreloadedStateMutations.js'

export const saveBookmark = (bookId, chapterIndex) => {
  const fraction = computeScrollFraction()
  const success = () => {
      addBookmarkMutation(bookId, chapterIndex, fraction)
      window.alert('Marcador guardado! Si cierras esta página podrás seguir leyendo desde la misma posición cuando regreses.')
    }
  const failiure = unauthorizedResponseHandler()

  addBookmark(bookId, chapterIndex, fraction)
    .then(success, failiure)
}

export const SaveBookmarkAction = (props) => {
  const {
    bookId,
    chapterIndex,
  } = props
  return <a className="navbar navbar-icon"
    onClick={() => saveBookmark(bookId, chapterIndex)}><Bookmark /></a>
}

export const OpenSettingsAction = () => {
  return <Link className="navbar" to="/settings"><Settings /></Link>
}
