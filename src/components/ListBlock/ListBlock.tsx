import React, { useState } from 'react';
import RequestsCard from '../RequestsCard/RequestsCard';
import './ListBlock.scss';

interface ListBlockProps {
    requests: { title: string; status: 'Выполнена' | 'Отказано' | 'На согласовании'; }[];
}

const ListBlock: React.FC<ListBlockProps> = ({ requests }) => {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    const handleSelect = (index: number) => {
        setSelectedIndex(index);
    };

    return (
        <div className="list-block">
            <div className="requests-list">
                {requests.map((request, index) => (
                    <RequestsCard
                        key={index}
                        title={request.title}
                        status={request.status}
                        isSelected={selectedIndex === index}
                        onSelect={() => handleSelect(index)}
                    />
                ))}
            </div>
            <div className="buttons">
                <button
                    className="save-btn"
                    disabled={selectedIndex === null}
                >
                    Сохранить
                </button>
                <button
                    className="update-btn"
                    disabled={selectedIndex === null}
                >
                    Отправить обновление
                </button>
            </div>
        </div>
    );
};

export default ListBlock;
