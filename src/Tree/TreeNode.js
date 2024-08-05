import React, { useState, useRef, useEffect } from 'react';
import { CgMathPlus, CgMathMinus } from "react-icons/cg";
import './Tree.css';

const TreeNode = ({ node, rememberState, prevState, onStateChange, selectedNode, onNodeSelect, depth = 0 }) => {
    const [isOpen, setIsOpen] = useState(prevState?.isOpen || false);
    const [childrenState, setChildrenState] = useState(prevState?.childrenState || {});
    const contentRef = useRef(null);
    const spaces = '\u00A0'.repeat(depth * 4); // 4 spaces per level node on the tree

    // When click on the open/close toggle
    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    // TASK3- Remember case
    useEffect(() => {
        if (rememberState && onStateChange) {
            onStateChange({ isOpen, childrenState });
        }
    }, [isOpen, childrenState, onStateChange, rememberState]);

    // TASK4- Animation
    useEffect(() => {
        const content = contentRef.current;
        if (content) {
            if (isOpen) {
                content.style.height = '0px';
                requestAnimationFrame(() => {
                    content.style.height = `${content.scrollHeight}px`;
                });
            } else {
                content.style.height = `${content.scrollHeight}px`;
                requestAnimationFrame(() => {
                    content.style.height = '0px';
                });
            }
        }
    }, [isOpen]);

    useEffect(() => {
        const content = contentRef.current;
        const handleTransitionEnd = () => {
            if (content) {
                if (isOpen) {
                    content.style.height = 'auto';
                }
            }
        };

        if (content) {
            content.addEventListener('transitionend', handleTransitionEnd);
            return () => {
                content.removeEventListener('transitionend', handleTransitionEnd);
            };
        }
    }, [isOpen]);

    // TASK5- Select
    const handleNodeClick = () => {
        onNodeSelect(node);
    };


    return (
        <div className="tree-node">
            {
                node.type === 'folder' ? (
                    <>
                        {/* node-content is the line of the node */}
                        <div className={`node-content ${selectedNode === node ? 'selected' : ''}`}  onClick={handleNodeClick}>
                            <span className="spaces">{spaces}</span>
                            <span onClick={handleToggle}>
                                {isOpen ?
                                    <CgMathMinus className="toggle-icon" /> : <CgMathPlus className="toggle-icon" />}
                            </span>
                            <span className="node-name">{node.name}</span>
                        </div>
                        <div className="animation-content" ref={contentRef}>
                            {rememberState
                                ? (node.children && (
                                    <div>
                                        {node.children.map((child, index) => (
                                            <TreeNode
                                                key={index}
                                                node={child}
                                                rememberState={rememberState}
                                                prevState={childrenState[index]}
                                                onStateChange={(state) => {
                                                    setChildrenState((prev) => ({
                                                        ...prev,
                                                        [index]: state,
                                                    }));
                                                }}
                                                selectedNode={selectedNode}
                                                onNodeSelect={onNodeSelect}
                                                depth={depth + 1}
                                            />
                                        ))}
                                    </div>
                                ))
                                : (isOpen && node.children && (
                                    <div>
                                        {node.children.map((child, index) => (
                                            <TreeNode
                                                key={index}
                                                node={child}
                                                rememberState={false}
                                                prevState={{}}
                                                onStateChange={() => { }}
                                                selectedNode={selectedNode}
                                                onNodeSelect={onNodeSelect}
                                                depth={depth + 1}
                                            />
                                        ))}
                                    </div>
                                ))}
                        </div>
                    </>
                ) : (
                    <div className={`node-content ${selectedNode === node ? 'selected' : ''}`}>
                        <span className="spaces">{spaces}</span>
                        <span className="node-name" id="file" onClick={handleNodeClick}>{node.name}</span>
                    </div>
                )
            }
        </div >
    );
};

export default TreeNode;
