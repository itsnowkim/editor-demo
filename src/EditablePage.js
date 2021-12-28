import { useState } from 'react';
import EditableBlock from './EditableBlock';
import uid from './utils/uid';
const EditPage = () => {
  const initialBlock = { id: uid(), html: '', tag: 'p', flag: false };
  const [blocks, setBlocks] = useState([initialBlock]);

  const updatePageHandler = (updatedBlock) => {
    const index = blocks.map((b) => b.id).indexOf(updatedBlock.id);
    const updatedBlocks = [...blocks];
    updatedBlocks[index] = {
      ...updatedBlocks[index],
      tag: updatedBlock.tag,
      html: updatedBlock.html,
      flag: updatedBlock.flag,
    };
    setBlocks(updatedBlocks);
  };

  const addBlockHandler = (currentBlock) => {
    const newBlock = { id: uid(), html: '', tag: 'p', flag: false };
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
    // 쪼개지는 범위에 따라 빈 string에 대한 핸들링 필요
    const prevHtml = targetHtml.substring(0, startPoint);
    const newHtml = targetHtml.substring(startPoint, endPoint);
    const nextHtml = targetHtml.substring(endPoint);
    const updatedBlocks = [...blocks];

    const index = blocks.map((b) => b.id).indexOf(currentBlock.id);

    if (prevHtml.length === 0 && nextHtml.length === 0) {
      //just update that index
      updatedBlocks[index] = {
        ...updatedBlocks[index],
        flag: true,
      };
    } else if (prevHtml.length === 0 && nextHtml.length !== 0) {
      //new -> index, next -> next
    } else if (prevHtml.length !== 0 && nextHtml.length === 0) {
      // prev -> index, new -> next
    } else {
      // update all
    }
    setBlocks(updatedBlocks);
    // console.log(index);
    // const updatedBlocks = [...blocks];
    // updatedBlocks[index] = {
    //   ...updatedBlocks[index],
    //   tag: currentBlock.tag,
    //   html: prevHtml,
    //   flag: currentBlock.flag,
    // };
    // const newBlock = { id: uid(), html: newHtml, tag: 'p', flag: true };
    // const nextBlock = { id: uid(), html: nextHtml, tag: 'p', flag: false };
    // updatedBlocks.splice(index + 1, 0, newBlock);
    // updatedBlocks.splice(index + 2, 0, nextBlock);

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
            flag={block.flag}
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
