import React, { memo } from 'react';
import { Player, BigPlayButton } from 'video-react';
import './index.css';
import { IVideoConfig } from './schema';
import logo from '@/assets/14-视频.png';
import { styles } from 'react-contexify/lib/utils/styles';

interface VideoTypes extends IVideoConfig {
  isTpl: boolean;
}

const VideoPlayer = memo((props: VideoTypes) => {
  const { poster, url, otherCode, isTpl } = props;
  return isTpl ? (
    <div>
      <img style={{width: '100%'}} src={logo} alt=""></img>
    </div>
  ) :(
    <div>
      {
        !otherCode ? <Player
                    playsInline
                    poster={poster[0].url}
                    src={url || 'https://gossv.vcg.com/cmsUploadVideo/creative/1移轴/7月移轴.mp4'}
                  >
                    <BigPlayButton position="center" />
                  </Player> :
                  <div dangerouslySetInnerHTML={{__html: otherCode}} className="videoIframeWrap">

                  </div>
      }
    </div>
  );
});

export default VideoPlayer;
