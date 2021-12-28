import { useState } from 'react';
import EditableBlock from './EditableBlock';
import uid from './utils/uid';
const EditPage = () => {
  const initialBlock = { id: uid(), html: '', tag: 'p', isBlock: false };
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
    const newBlock = { id: uid(), html: '', tag: 'p', isBlock: false };
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
    const { startPoint, endPoint } = currentBlock;
    const targetHtml = currentBlock.html;
    const prevHtml = targetHtml.substring(0, startPoint);
    const newHtml = targetHtml.substring(startPoint, endPoint);
    const nextHtml = targetHtml.substring(endPoint);

    console.log(currentBlock);
    // 해당 값을 새로운 component로 생성, isBlock=true로.
    // blocks 배열에 올바른 위치에 넣어주기

    const index = blocks.map((b) => b.id).indexOf(currentBlock.id);
    console.log(index);
    const updatedBlocks = [...blocks];
    updatedBlocks[index] = {
      ...updatedBlocks[index],
      tag: currentBlock.tag,
      html: prevHtml,
      isBlock: currentBlock.isBlock,
    };
    const newBlock = { id: uid(), html: newHtml, tag: 'p', isBlock: true };
    const nextBlock = { id: uid(), html: nextHtml, tag: 'p', isBlock: false };
    updatedBlocks.splice(index + 1, 0, newBlock);
    updatedBlocks.splice(index + 2, 0, nextBlock);

    setBlocks(updatedBlocks);
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
        backgroundColor: '#ffffff',
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
