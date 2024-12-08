import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
} from 'react-share';

interface ShareButtonsProps {
  url: string;
  title: string;
  description: string;
}

export function ShareButtons({ url, title, description }: ShareButtonsProps) {
  return (
    <div className="flex space-x-4">
      <FacebookShareButton url={url} quote={title}>
        <FacebookIcon size={32} round />
      </FacebookShareButton>

      <TwitterShareButton url={url} title={title}>
        <TwitterIcon size={32} round />
      </TwitterShareButton>

      <LinkedinShareButton url={url} title={title} summary={description}>
        <LinkedinIcon size={32} round />
      </LinkedinShareButton>
    </div>
  );
}