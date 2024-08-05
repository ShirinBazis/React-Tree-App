import React, { useState } from 'react';
import './Tree.css';
import TreeNode from './TreeNode';

const Tree = ({ data }) => {
    const [selectedNode, setSelectedNode] = useState(null);
    const handleNodeSelect = (node) => {
        setSelectedNode(node);
    };

    return (
        <div>
            {data.map((node, index) => (
                <TreeNode
                    key={index}
                    node={node}
                    rememberState={true}
                    prevState={{}}
                    onStateChange={() => { }}
                    selectedNode={selectedNode}
                    onNodeSelect={handleNodeSelect}
                />
            ))}
        </div>
    );
};


// The case of not remembering the last open subfolders and files
const TreeN = ({ data }) => {
    const [selectedNode, setSelectedNode] = useState(null);
    const handleNodeSelect = (node) => {
        setSelectedNode(node);
    };

    return (
        <div>
            {data.map((node, index) => (
                <TreeNode
                    key={index}
                    node={node}
                    rememberState={false}
                    prevState={{}}
                    onStateChange={() => { }}
                    selectedNode={selectedNode}
                    onNodeSelect={handleNodeSelect}
                />
            ))}
        </div>
    );
};

export { Tree, TreeN };