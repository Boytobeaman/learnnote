import React from 'react'
import PropTypes from 'prop-types'
import { NotesPostTemplate } from '../../templates/notes-post'

const NotesPostPreview = ({ entry, widgetFor }) => (
  <NotesPostTemplate
    content={widgetFor('body')}
    description={entry.getIn(['data', 'description'])}
    tags={entry.getIn(['data', 'tags'])}
    title={entry.getIn(['data', 'title'])}
  />
)

NotesPostPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default NotesPostPreview
