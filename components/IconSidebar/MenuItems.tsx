import GridOnIcon from '@material-ui/icons/GridOn'
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import TextFieldsIcon from '@material-ui/icons/TextFields'

import FontOptions from './FontOptions'
import PictogramOptions from './PictogramOptions'
import TemplateOptions from './TemplateOptions'
import UploadOptions from './UploadOptions'

export const TEMPLATE = 'TEMPLATE'
export const PICTOGRAM = 'PICTOGRAM'
export const TEXT = 'TEXT'
export const UPLOAD_FILE = 'UPLOAD_FILE'

const MenuItems = [
  { type: TEMPLATE, MenuIcon: GridOnIcon, Component: TemplateOptions },
  { type: TEXT, MenuIcon: TextFieldsIcon, Component: FontOptions },
  { type: PICTOGRAM, MenuIcon: PhotoLibraryIcon, Component: PictogramOptions },
  { type: UPLOAD_FILE, MenuIcon: CloudUploadIcon, Component: UploadOptions },
]

export default MenuItems
