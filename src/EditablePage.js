import { useState } from "react";
import EditableBlock from "./EditableBlock";
const EditPage = () => {
  const [blocks,setBlocks] = useState([]);

  return(
    <div style={{display: 'flex', flexDirection: 'column', width: "450px", margin: '12px', border: '1px solid black'}}>
      <EditableBlock/>
    </div>
  )
}
export default EditPage;