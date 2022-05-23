import { SearchIcon } from './SearchIcon'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

export default function Results(props) {
  const {
    results,
    onClick,
    setSearchString,
    showIcon,
    maxResults,
    resultStringKeyName,
    onHover,
    formatResult
  } = props

  const handleClick = (result) => {
    onClick(result)
    setSearchString(result[resultStringKeyName])
  }

  return (
    results?.length > 0 && (
      <StyledResults>
        <div className="line" />
        <ul>
          {results.slice(0, maxResults).map((result) => {
            return (
              <li
                onMouseEnter={() => onHover(result)}
                data-test="result"
                key={`rsa-result-${result.id}`}
                onMouseDown={() => handleClick(result)}
                onClick={() => handleClick(result)}
              >
                <SearchIcon showIcon={showIcon} />
                <div className="ellipsis" title={result[resultStringKeyName]}>
                  {formatResult(result)}
                </div>
              </li>
            )
          })}
        </ul>
      </StyledResults>
    )
  )
}

Results.defaultProps = {
  results: [],
  setDisplayString: () => {},
  resultStringKeyName: 'name',
  formatResult: (val) => val
}

Results.propTypes = {
  results: PropTypes.array,
  onClick: PropTypes.func,
  setSearchString: PropTypes.func,
  showIcon: PropTypes.bool,
  maxResults: PropTypes.number,
  resultStringKeyName: PropTypes.string,
  formatResult: PropTypes.func
}

const StyledResults = styled.div`
  position: absolute;
  width: 100%;
  top: calc(100% + 3px);
  left: -1px;
  border: 1px solid #b8bbc3;
  box-sizing: content-box;
  border-radius: 6px;

  > ul {
    padding: 1px 0;
    list-style-type: none;
    margin: 0;
    max-height: ${(props) => props.theme.maxHeight};

    > li {
      padding: 8px 0;

      &:hover {
        background-color: ${(props) => props.theme.hoverBackgroundColor};
        cursor: default;
      }

      > div {
        margin-left: 13px;
      }
    }
  }

  .ellipsis {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`
