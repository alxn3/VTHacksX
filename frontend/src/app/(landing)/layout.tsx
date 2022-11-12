export default function RootLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
        <div className="layout w-[min(var(--content-width),var(--max-content-width))] h-full mx-auto">{children}</div>
    );
  }
  