import './VideoSection.css';

const VideoSection = ({
    videoUrl,
    thumbnailUrl,
    title,
    description,
    alignment = 'left'
}) => {
    return (
        <div className={`video-section ${alignment === 'right' ? 'video-right' : ''}`}>
            <div className="video-wrapper glass-card">
                {videoUrl ? (
                    <div className="video-embed">
                        <iframe
                            src={videoUrl}
                            title={title || 'Video'}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                ) : thumbnailUrl ? (
                    <div className="video-thumbnail">
                        <img src={thumbnailUrl} alt={title || 'Video thumbnail'} />
                        <button className="video-play-btn" aria-label="Play Video">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M8 5v14l11-7z" />
                            </svg>
                        </button>
                    </div>
                ) : null}
            </div>

            {(title || description) && (
                <div className="video-content">
                    {title && <h3 className="video-title">{title}</h3>}
                    {description && <p className="video-description">{description}</p>}
                </div>
            )}
        </div>
    );
};

export default VideoSection;
