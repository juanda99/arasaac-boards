import GridOnIcon from '@mui/icons-material/GridOn'
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import TextFieldsIcon from '@mui/icons-material/TextFields'

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
