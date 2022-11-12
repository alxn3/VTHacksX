import { SiTwitter, SiGmail, SiInstagram } from 'react-icons/si';

const contact = [
  {
    name: 'Instagram',
    icon: <SiInstagram />,
    url: '#',
  },
  {
    name: 'Twitter',
    icon: <SiTwitter />,
    url: 'https://twitter.com/artscapernet',
  },
  {
    name: 'Mail',
    icon: <SiGmail />,
    url: 'mailto:contact@artscaper.net',
  },
];

type Props = {
  containerClassName?: string;
  iconClassName?: string;
};

const Socials = ({ containerClassName, iconClassName }: Props) => {
  return (
    <div
      className={`flex mt-4 space-x-6 ${containerClassName || ''}`}
    >
      {contact.map((elem, i) => (
        <span
          key={i}
          className={` ${
            iconClassName || ''
          }`}
        >
          <a href={elem.url} title={elem.name} rel="noreferrer" target="_blank">
            {elem.icon}
          </a>
        </span>
      ))}
    </div>
  );
};

export default Socials;
