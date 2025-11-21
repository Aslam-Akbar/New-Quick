import Link from "next/link";

export default function NotFound() {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column',
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '70vh',
      textAlign: 'center'
    }}>
      <h1 style={{ fontSize: '4rem', marginBottom: '1rem', color: 'var(--primary-color)' }}>404</h1>
      <p style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>Page Not Found</p>
      <Link href="/" className="btn btn-primary">
        Return Home
      </Link>
    </div>
  );
}
