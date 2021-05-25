const Sidebar = ({ onDrag }) => {
  // const [openDrawer, toggleDrawer] = React.useState(true)
  // const handleToggleDrawer = () => toggleDrawer(!openDrawer)

  return (
    <>
      {/* {!openDrawer && (
        <div
          style={{
            position: 'fixed',
            width: '130px',
            height: '100%',
            top: 0,
          }}
          onMouseOver={handleToggleDrawer}
        />
      )} */}
      <div>
        <img
          alt="lion"
          src="https://static.arasaac.org/pictograms/27509/27509_300.png"
          draggable="true"
          style={{ width: '100px', height: '100px' }}
          onDragStart={(e) => {
            onDrag(e.target.src)
          }}
        />
      </div>
    </>
  )
}

export default Sidebar
