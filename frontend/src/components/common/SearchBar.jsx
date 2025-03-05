import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  InputBase,
  IconButton,
  Paper,
  Popper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  CircularProgress,
  ClickAwayListener,
  alpha,
  useTheme,
} from '@mui/material';
import {
  Search as SearchIcon,
  Clear as ClearIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useSearch } from '../../context/SearchContext';

const SearchBar = ({ 
  placeholder = "Search...", 
  width = 300,
  variant = "default", // 'default' or 'navbar'
  onSearch = null, // Optional callback for local search
}) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const searchRef = useRef(null);
  const {
    globalSearchTerm,
    searchResults,
    isSearching,
    performSearch,
    clearSearch,
  } = useSearch();

  useEffect(() => {
    // Update input value when global search term changes
    setInputValue(globalSearchTerm);
  }, [globalSearchTerm]);

  const handleSearchChange = async (event) => {
    const value = event.target.value;
    setInputValue(value);
    setAnchorEl(searchRef.current);

    if (onSearch) {
      // Local search
      onSearch(value);
    } else {
      // Global search
      performSearch(value);
    }
  };

  const handleClear = () => {
    setInputValue('');
    setAnchorEl(null);
    if (onSearch) {
      onSearch('');
    } else {
      clearSearch();
    }
  };

  const handleResultClick = (result) => {
    setAnchorEl(null);
    navigate(result.url);
    handleClear();
  };

  const handleClickAway = () => {
    setAnchorEl(null);
  };

  const isNavbar = variant === 'navbar';
  const showResults = Boolean(anchorEl) && (searchResults.length > 0 || isSearching);

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box sx={{ position: 'relative' }} ref={searchRef}>
        <Paper
          elevation={isNavbar ? 0 : 1}
          sx={{
            p: '2px 4px',
            display: 'flex',
            alignItems: 'center',
            width: width,
            bgcolor: isNavbar ? alpha(theme.palette.common.white, 0.15) : 'background.paper',
            '&:hover': {
              bgcolor: isNavbar ? alpha(theme.palette.common.white, 0.25) : 'background.paper',
            },
          }}
        >
          <IconButton sx={{ p: '10px' }} aria-label="search">
            <SearchIcon sx={{ color: isNavbar ? 'white' : 'inherit' }} />
          </IconButton>
          <InputBase
            sx={{
              ml: 1,
              flex: 1,
              color: isNavbar ? 'white' : 'inherit',
              '& .MuiInputBase-input::placeholder': {
                color: isNavbar ? alpha(theme.palette.common.white, 0.7) : 'inherit',
                opacity: 1,
              },
            }}
            placeholder={placeholder}
            value={inputValue}
            onChange={handleSearchChange}
          />
          {inputValue && (
            <IconButton 
              size="small" 
              onClick={handleClear}
              sx={{ color: isNavbar ? 'white' : 'inherit' }}
            >
              <ClearIcon />
            </IconButton>
          )}
        </Paper>

        <Popper
          open={showResults}
          anchorEl={anchorEl}
          placement="bottom-start"
          sx={{
            width: width,
            mt: 1,
            zIndex: theme.zIndex.modal,
          }}
        >
          <Paper elevation={3}>
            {isSearching ? (
              <Box sx={{ p: 2, textAlign: 'center' }}>
                <CircularProgress size={20} />
              </Box>
            ) : (
              <List sx={{ p: 0 }}>
                {searchResults.map((result, index) => (
                  <ListItem
                    key={`${result.type}-${result.id}`}
                    button
                    onClick={() => handleResultClick(result)}
                    divider={index < searchResults.length - 1}
                  >
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <Typography variant="body1">{result.icon}</Typography>
                    </ListItemIcon>
                    <ListItemText
                      primary={result.name || result.title || result.description}
                      secondary={result.type.charAt(0).toUpperCase() + result.type.slice(1)}
                    />
                  </ListItem>
                ))}
              </List>
            )}
          </Paper>
        </Popper>
      </Box>
    </ClickAwayListener>
  );
};

export default SearchBar;
