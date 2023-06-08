import Link from 'next/link';
import Image from 'next/image';
import SVGLogo from './SVGLogo';

export default function Header({ name }) {
  return (
    <header className="pt-2 pb-2">
     <Link href="/">
        <a>
          <SVGLogo />
        </a>
      </Link>
      {name && 
      <p className="text-2xl dark:text-white text-center">
        <Link href="/">
          <a>{name}</a>
        </Link>
      </p>
      }
    </header>
  );
}
