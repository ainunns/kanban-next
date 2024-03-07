import Typography from '@/components/Typography';
import clsxm from '@/lib/clsxm';

export default function HelperText({
  children,
  helperTextClassName,
}: {
  children: string;
  helperTextClassName?: string;
}) {
  return (
    <div className='flex space-x-1'>
      <Typography
        variant='c2'
        className={clsxm(
          'text-xs !leading-tight text-typo-secondary',
          helperTextClassName,
        )}
      >
        {children}
      </Typography>
    </div>
  );
}
