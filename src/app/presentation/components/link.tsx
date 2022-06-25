import NextLink from 'next/link';

export { Link };

const Link = ({ href, children, ...props }: any) => {
  return (
    <NextLink href={href}>
      <a {...props}>{children}</a>
    </NextLink>
  );
};
