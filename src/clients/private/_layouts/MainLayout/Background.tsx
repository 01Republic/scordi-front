import {memo} from 'react';

export const Background = memo(function Background() {
    const url = '';
    // const url =
    //     'https://lh3.googleusercontent.com/proxy/nMIspgHzTUU0GzmiadmPphBelzF2xy9-tIiejZg3VvJTITxUb-1vILxf-IsCfyl94VSn6YvHa8_PiIyR9d3rwD8ZhNdQ1C1rnblP6zy3OaI=w3840-h2160-p-k-no-nd-mv';

    return (
        <div
            className="w-full h-full fixed background-image background-image-cover blur-sm scale-[1.02]"
            style={{backgroundImage: `url(${url})`}}
        />
    );
});
