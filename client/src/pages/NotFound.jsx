const NotFound = () => {
  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0076FF 0%, #1CA638 100%)',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      padding: '20px',
      boxSizing: 'border-box',
      textAlign: 'center',
      color: 'white',
      animation: 'fadeIn 1.2s ease-in-out',
    },

    content: {
      maxWidth: '600px',
      width: '100%',
      animation: 'fadeUp 1.5s ease-in-out',
    },

    errorCode: {
      fontSize: '140px',
      fontWeight: '900',
      color: 'white',
      lineHeight: '1',
      marginBottom: '20px',
      textShadow: `
        0 0 15px rgba(255, 255, 255, 0.4),
        0 0 30px rgba(0, 118, 255, 0.5),
        0 0 45px rgba(28, 166, 56, 0.5)
      `,
      animation: 'float404 3s ease-in-out infinite',
    },

    errorTitle: {
      fontSize: '32px',
      color: 'white',
      marginBottom: '20px',
      fontWeight: '600',
      textShadow: '1px 1px 4px rgba(0, 0, 0, 0.4)',
    },

    errorMessage: {
      color: 'rgba(255, 255, 255, 0.9)',
      fontSize: '18px',
      lineHeight: '1.6',
      marginBottom: '30px',
      textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)',
    },

    errorActions: {
      display: 'flex',
      gap: '15px',
      justifyContent: 'center',
      flexWrap: 'wrap',
    },

    primaryButton: {
      padding: '12px 30px',
      border: '2px solid white',
      background: 'white',
      color: '#0076FF',
      borderRadius: '50px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      textDecoration: 'none',
      display: 'inline-block',
      boxShadow: '0 4px 10px rgba(255, 255, 255, 0.2)',
    },
    
  };

  const handleMouseEnter = (e) => {
    e.target.style.background = 'rgba(255, 255, 255, 0.9)';
    e.target.style.transform = 'translateY(-2px)';
    e.target.style.boxShadow = '0 8px 20px rgba(255, 255, 255, 0.3)';
  };

  const handleMouseLeave = (e) => {
    e.target.style.background = 'white';
    e.target.style.color = '#0076FF';
    e.target.style.transform = 'translateY(0)';
    e.target.style.boxShadow = '0 4px 10px rgba(255, 255, 255, 0.2)';
  };

  return (
    <>
      <style>
        {`
          // @keyframes fadeIn {
          //   from { opacity: 0; transform: scale(0.98); }
          //   to { opacity: 1; transform: scale(1); }
          // }

          @keyframes fadeUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }

          @keyframes float404 {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }

          @media (max-width: 768px) {
            .error-code { font-size: 90px !important; }
            .error-title { font-size: 24px !important; }
            .error-message { font-size: 16px !important; }
            .error-actions {
              flex-direction: column !important;
              align-items: center !important;
            }
            .primary-button { width: 200px !important; }
          }

          @media (max-width: 480px) {
            .error-code { font-size: 70px !important; }
            .error-title { font-size: 20px !important; }
            .error-message { font-size: 14px !important; }
          }
        `}
      </style>

      <div style={styles.container}>
        <div style={styles.content}>
          <div style={styles.errorCode} className="error-code">
            404
          </div>
          <h1 style={styles.errorTitle} className="error-title">
            Oops, This Page Not Found
          </h1>
          <p style={styles.errorMessage} className="error-message">
            The page you are looking for might have been removed, had its name changed,
            or is temporarily unavailable.
          </p>
          <div style={styles.errorActions} className="error-actions">
            <button
              style={styles.primaryButton}
              className="primary-button"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={() => (window.location.href = '/')}
            >
              Go Home
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
