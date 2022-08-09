import { defaultTheme, defaultFuseOptions } from '../config/config'
import { debounce } from '../utils/utils'
import Results from './Results'
import SearchInput from './SearchInput'
import Fuse from 'fuse.js'
import PropTypes from 'prop-types'
import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import styled, { ThemeProvider } from 'styled-components'

export const DEFAULT_INPUT_DEBOUNCE = 200
export const MAX_RESULTS = 200

export default function ReactReusableAutocomplete(props) {
    const {
        autoFocus,
        formatResult,
        fuseOptions,
        inputDebounce,
        inputSearchString,
        items,
        maxResults,
        onBlur = () => setResults([]),
        onClear,
        onHover,
        onFocus,
        onSearch,
        onSelect,
        placeholder,
        resultStringKeyName,
        showClear,
        showIcon,
        styling
    } = props

    const theme = { ...defaultTheme, ...styling }
    const options = { ...defaultFuseOptions, ...fuseOptions }
    const fuse = useRef(new Fuse(items, options))
    const [searchString, setSearchString] = useState(inputSearchString)
    const [results, setResults] = useState()
    
    const handleOnSearch = useCallback(inputDebounce > 0 ? debounce((keyword) => callOnSearch(keyword), inputDebounce):(keyword) => callOnSearch(keyword), [items])

    useEffect(() => {
        fuse.current.setCollection(items)
    }, [fuse.current])

    const callOnSearch = (keyword) => {
        let newResults = []
        if (keyword?.length >= 0) {
            newResults = fuseResults(keyword)
            setResults(newResults)
            onSearch(keyword, newResults)
        } else {
            setResults(newResults)
        }
    }

    useLayoutEffect(() => {
        setSearchString(inputSearchString)
    }, [inputSearchString])

    useEffect(() => {
        searchString?.length > 0 && results?.length > 0 && setResults(fuseResults(searchString))
    }, [items])

    const handleOnClick = (result) => {
        setResults([])
        onSelect(result)
    }

    const fuseResults = (keyword = ' ') => {
        const searchWord = keyword==='' ? ' ':keyword
        const results = fuse.current
                .search(searchWord, { limit: maxResults })
                .map((result) => ({ ...result.item }))
                .slice(0, maxResults)
        return results
    }

    const handleSetSearchString = ({ target }) => {
        const keyword = target.value
        setSearchString(keyword)
        handleOnSearch(keyword)
    }

    const handleFocus = () => {
        if (searchString=='') {
            handleOnSearch(' ')
        } else {
            handleOnSearch(searchString)
        }
        onFocus()
    }

    return (<ThemeProvider theme={theme}>
        <StyledReactSearchAutocomplete>
            <SearchInput
                    searchString={searchString}
                    setSearchString={handleSetSearchString}
                    autoFocus={autoFocus}
                    onBlur={onBlur}
                    onFocus={handleFocus}
                    onClear={onClear}
                    placeholder={placeholder}
                    showIcon={showIcon}
                    showClear={showClear}
            />
            <Results
                    results={results}
                    onClick={handleOnClick}
                    onHover={onHover}
                    setSearchString={setSearchString}
                    showIcon={showIcon}
                    maxResults={maxResults}
                    resultStringKeyName={resultStringKeyName}
                    formatResult={formatResult}
            />
        </StyledReactSearchAutocomplete>
    </ThemeProvider>)
}

ReactReusableAutocomplete.defaultProps = {
    items: [],
    fuseOptions: defaultFuseOptions,
    onSearch: () => {
        /* intentionally empty */
    },
    onHover: () => {
        /* intentionally empty */
    },
    onSelect: () => {
        /* intentionally empty */
    },
    onClear: () => {
        /* intentionally empty */
    },
    inputDebounce: DEFAULT_INPUT_DEBOUNCE,
    showIcon: true,
    showClear: true,
    maxResults: MAX_RESULTS,
    placeholder: '',
    autoFocus: false,
    onFocus: () => {
    },
    styling: {},
    resultStringKeyName: 'name',
    inputSearchString: '',
    formatResult: (val) => val
}

ReactReusableAutocomplete.propTypes = {
    items: PropTypes.array,
    fuseOptions: PropTypes.object,
    inputDebounce: PropTypes.number,
    onSearch: PropTypes.func,
    onHover: PropTypes.func,
    onSelect: PropTypes.func,
    onClear: PropTypes.func,
    onFocus: PropTypes.func,
    showIcon: PropTypes.bool,
    showClear: PropTypes.bool,
    maxResults: PropTypes.number,
    placeholder: PropTypes.string,
    autoFocus: PropTypes.bool,
    styling: PropTypes.object,
    resultStringKeyName: PropTypes.string,
    inputSearchString: PropTypes.string,
    formatResult: PropTypes.func
}

const StyledReactSearchAutocomplete = styled.div`
  position: relative;
  width: ${(props) => props.theme.width};
  max-width: ${(props) => props.theme.maxWidth};
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: ${(props) => props.theme.backgroundColor};
  border-radius: ${(props) => props.theme.borderRadius};
  border: ${(props) => props.theme.border};
  color: ${(props) => props.theme.color};
  font-family: ${(props) => props.theme.fontFamily};
  font-size: ${(props) => props.theme.fontSize};
  z-index: ${(props) => props.theme.zIndex};
  margin: ${(props) => props.theme.margin};

  &:hover {
    box-shadow: ${(props) => props.theme.boxShadow};
  }

  &:active {
    box-shadow: ${(props) => props.theme.boxShadow};
  }

  &:focus-within {
    box-shadow: ${(props) => props.theme.boxShadow};
  }
`
