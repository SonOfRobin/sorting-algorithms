import { ReactElement } from 'react';
import { SortMethod } from '../components/BarContainer';
import pauseFunction from '../utilities/pauseFunction';
import barClassSwapper from '../utilities/barClassSwapper';
import colorize from '../utilities/colorize';

class TreeNode {
  key: ReactElement<HTMLDivElement> | null;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(key: ReactElement<HTMLDivElement> | null = null) {
    this.key = key;
    this.left = this.right = null;
  }
}

const treeSort: SortMethod = async (parentNode, setBars, bars, setIsSorting) => {
  let newBars: ReactElement<HTMLDivElement>[] = [...bars];

  
  
  let root: TreeNode | null = new TreeNode();
  root = null;
  
  for (const i of bars) {
    root = insertValues(root, i);
  }
  
  function insertValues(root: TreeNode | null, key: ReactElement<HTMLDivElement>) {
    if (!root) {
      root = new TreeNode(key);
      return root;
    } else if (root.key) {
      if (parseFloat(key.props.style.height) <= parseFloat(root.key.props.style.height))
      root.left = insertValues(root.left, key);
    else if (parseFloat(key.props.style.height) > parseFloat(root.key.props.style.height))
    root.right = insertValues(root.right, key);
}
return root;
}

let testNodes: Map<string, HTMLDivElement>;
if (parentNode.current){
  testNodes = new Map(
    Array.from([...parentNode.current.children]).map((bar) => [bar.id, bar])
  );
}
  async function inorderRecurse(root: TreeNode | null) {
    if (root) {
      if (root.left) {
        await inorderRecurse(root.left);
      }
      if (root.key) {
        const activeNode = testNodes.get(root.key.key as string)
        if (activeNode) {
          [activeNode.className, activeNode.style.backgroundColor] = [barClassSwapper(activeNode), colorize(activeNode, bars.length)]
          await pauseFunction()
          newBars = newBars.filter((bar) => bar.key != root.key?.key);
          newBars.push(root.key);
          setBars([...newBars]);
          await pauseFunction();
          activeNode.className = barClassSwapper(activeNode);
        }
      }
      if (root.right) {
        await inorderRecurse(root.right);
      }
    }
  }
  await inorderRecurse(root);
  setIsSorting(false);
};

export default treeSort;
