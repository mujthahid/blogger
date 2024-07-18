
import { Box, Typography } from '@mui/material';

const ErrorComponent = ({ message }) => {
  return (
    <Box
    data-testid="error-box" // Adding data-testid for specific identification in tests
      sx={{
        backgroundColor: '#ffebee',
        color: '#b71c1c',
        padding: '10px',
        border: '1px solid #e57373',
        borderRadius: '4px',
        marginBottom: '10px',
      }}
    >
      <Typography variant="subtitle1">
        {message}
      </Typography>
    </Box>
  );
};

export default ErrorComponent;
