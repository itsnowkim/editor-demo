import { useState } from 'react';
import EditableBlock from './EditableBlock';
import uid from './utils/uid';
const EditPage = () => {
  const initialBlock = { id: uid(), html: '', tag: 'p' };
  const [blocks, setBlocks] = useState([initialBlock]);

  const updatePageHandler = (updatedBlock) => {
    const index = blocks.map((b) => b.id).indexOf(updatedBlock.id);
    const updatedBlocks = [...blocks];
    updatedBlocks[index] = {
      ...updatedBlocks[index],
      tag: updatedBlock.tag,
      html: updatedBlock.html,
    };
    setBlocks(updatedBlocks);
  };

  const addBlockHandler = (currentBlock) => {
    const newBlock = { id: uid(), html: '', tag: 'p', isBlock: true };
    const index = blocks.map((b) => b.id).indexOf(currentBlock.id);
    const updatedBlocks = [...blocks];
    updatedBlocks.splice(index + 1, 0, newBlock);
    setBlocks(updatedBlocks);
    // this.setState({ blocks: updatedBlocks }, () => {
    //   currentBlock.ref.nextElementSibling.focus();
    // });
  };

  const deleteBlockHandler = (currentBlock) => {
    const previousBlock = currentBlock.ref.previousElementSibling;
    if (previousBlock) {
      const index = blocks.map((b) => b.id).indexOf(currentBlock.id);
      const updatedBlocks = [...blocks];
      updatedBlocks.splice(index, 1);
      setBlocks(updatedBlocks);
      // this.setState({ blocks: updatedBlocks }, () => {
      //   setCaretToEnd(previousBlock);
      //   previousBlock.focus();
      // });
    }
  };

  const updateBlockHandler = (currentBlock) => {
    console.log(currentBlock);
    // const index = blocks.map((b) => b._id).indexOf(currentBlock.id);
    // const updatedBlocks = [...blocks];
    // updatedBlocks[index] = {
    //   ...updatedBlocks[index],
    //   tag: currentBlock.tag,
    //   html: currentBlock.html,
    //   isBlock: currentBlock.isBlock,
    // };
    // setBlocks(updatedBlocks);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '450px',
        minHeight: '580px',
        margin: '24px',
        paddingTop: '24px',
        border: '1px solid black',
      }}
    >
      {blocks.map((block) => {
        return (
          <EditableBlock
            key={block.id}
            id={block.id}
            tag={block.tag}
            html={block.html}
            updatePage={updatePageHandler}
            addBlock={addBlockHandler}
            deleteBlock={deleteBlockHandler}
            updateBlock={updateBlockHandler}
          />
        );
      })}
    </div>
  );
};
export default EditPage;
