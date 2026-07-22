import Link from 'next/link';
import Image from 'next/image';
import Nav from './Nav';

export default function Header() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link href="/" className="site-logo" aria-label="i-NEXT home">
          <span className="logo-wrap">
            <Image
              src="/images/gallery/inext.png"
              alt="i-NEXT logo"
              fill
              className="logo-img"
              priority
              sizes="160px"
            />
          </span>
        </Link>
        <Nav />
      </div>
    </header>
  );
}
