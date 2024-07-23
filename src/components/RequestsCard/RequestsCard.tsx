import React from 'react';
import './RequestsCard.scss';

interface RequestsCardProps {
    title: string;
    status: 'Выполнена' | 'Отказано' | 'На согласовании';
    isSelected: boolean;
    onSelect: () => void;
}

const RequestsCard: React.FC<RequestsCardProps> = ({ title, status, isSelected, onSelect }) => {
    const statusStyles = {
        'Выполнена': {
            background: 'linear-gradient(45deg, rgb(47, 214, 92), rgb(32, 193, 199))'
        },
        'Отказано': {
            background: 'linear-gradient(45deg, rgb(245, 174, 76), rgb(250, 140, 174))'
        },
        'На согласовании': {
            background: 'rgb(239, 107, 37)'
        }
    };

    return (
        <div className={`request-card ${isSelected ? 'selected' : ''}`} onClick={onSelect}>
            <div className="request-title">{title}</div>
            <div className="request-status">
                <p style={statusStyles[status]} >{status}</p>
            </div>
        </div>
    );
};

export default RequestsCard;
