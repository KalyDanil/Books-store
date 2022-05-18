import { CommentStyle } from './Comment.styled';
import { useState, useEffect } from 'react';
import { IComments } from '../../utils/types';

const Comment: React.FC<IComments> = ({ comment }) => {
    const dayjs = require('dayjs');
    const [timestampValue, setTimestampValue] = useState(0);
    const [timestampName, setTimestampName] = useState('');
    let timeAgo = Math.round((dayjs() - dayjs(comment.createdAt)) / 1000);

    const putTimeAgo = () => {
        if (isNaN(timeAgo)) {
            setTimestampValue((dayjs() - dayjs(comment.createdAt)));
            setTimestampName('seconds');
            return;
        }

        if (timeAgo < 60) {
            setTimestampValue(timeAgo);
            setTimestampName('seconds');
            return;
        }

        if (timeAgo >= 60 && timeAgo < 3600) {
            setTimestampValue(Math.round(timeAgo / 60));
            setTimestampName('minutes');
            return;
        }

        if (timeAgo >= 3600) {
            setTimestampValue(Math.round(timeAgo / 60 / 60));
            setTimestampName('hours');
            return;
        }

        if (timeAgo >= 86400) {
            setTimestampValue(Math.round(timeAgo / 60 / 60 / 24));
            setTimestampName('days');
            return;
        }
    }

    useEffect(() => {
        putTimeAgo();
    }, [comment.createdAt]);

    return (
        <CommentStyle>
            <img src={'http://localhost:4000/uploads/' + comment.User.avatar} alt='avatar' />
            <p className='comments__commentator'>{comment.User.fullName}</p>
            <p className='comments__date'>Left a comment {timestampValue} {timestampName} ago</p>
            <p className='comments__text'>
                {comment.comment}
            </p>
        </CommentStyle>
    );
}

export default Comment;