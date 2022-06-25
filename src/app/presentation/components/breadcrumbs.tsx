import { Breadcrumbs as BreadcrumbsMui } from '@mui/material';
import { MdNavigateNext as NavigateNextIcon } from 'react-icons/md';
import { Link } from '~/app/presentation/components';

type BreadcrumbsProps = {
  children?: React.ReactNode;
};

export default function Breadcrumbs({ children }: BreadcrumbsProps) {
  return (
    <BreadcrumbsMui
      separator={<NavigateNextIcon fontSize='small' />}
      aria-label='breadcrumb'
    >
      <Link
        style={{
          color: '#B5B5B5',
          textDecoration: 'none'
        }}
        href='/'
      >
        E-form
      </Link>

      {children}
    </BreadcrumbsMui>
  );
}
