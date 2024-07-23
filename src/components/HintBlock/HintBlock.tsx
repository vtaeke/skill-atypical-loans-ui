import React from 'react';
import './HintBlock.scss';
import somePic from '../../resources/somePic.svg';

interface HintsBlockProps {
    fileList: File[];
    onFileRemove: (index: number) => void;
}

const HintsBlock: React.FC<HintsBlockProps> = ({ fileList, onFileRemove }) => {
    return (
        <div className="hints-block">
            <h2>Подсказки</h2>
            {fileList.length === 0 && <img src={somePic} alt="icon" className="placeholder" />}
            <div className="thumbnails">
                {fileList.map((file, index) => (
                    <div key={index} className="thumbnail-container" >
                        <img
                            src={URL.createObjectURL(file)}
                            alt={file.name}
                            className="thumbnail"
                            onContextMenu={(event) => {
                                event.preventDefault();
                                onFileRemove(index);
                            }}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HintsBlock;
