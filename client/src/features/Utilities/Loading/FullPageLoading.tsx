import Loading from '.';

export default function FullPageLoading() {
  return (
    <div className="fixed top-0 z-40 flex h-full w-full items-center justify-center bg-gray-50 opacity-80">
      <Loading />
    </div>
  );
}
