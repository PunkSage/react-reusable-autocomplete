import React from 'react'
import PropTypes from 'prop-types'
import { SearchIcon } from './SearchIcon'
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
    (results?.length > 0 && <StyledResults>
      <div className='line' />
      <ul>
        {results.slice(0, maxResults).map((result) => {
          return (
            <li
              onMouseEnter={() => onHover(result)}
              data-test='result'
              key={`rsa-result-${result.id}`}
              onMouseDown={() => handleClick(result)}
              onClick={() => handleClick(result)}
            >
              <SearchIcon showIcon={showIcon} />
              <div className='ellipsis' title={result[resultStringKeyName]}>
                {formatResult(result[resultStringKeyName])}
              </div>
            </li>
          )
        })}
      </ul>
    </StyledResults>)
  )
}

Results.defaultProps = {
  results: [],
  setDisplayString: () => {
  },
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
  background-color: white;
  top: calc(100% - 5px);
  left: -1px;
  border: 1px solid #b8bbc3;
  border-top: 0;
  box-sizing: content-box;
  border-radius: 0 0 4px 4px;

  > div.line {
    border-top-color: ${(props) => props.theme.lineColor};
    border-top-style: solid;
    border-top-width: 1px;
    margin: 0 10px;
  }

  > ul {
    list-style-type: none;
    margin: 0;
    padding: 10px 0;
    max-height: ${(props) => props.theme.maxHeight};

    > li {
      display: flex;
      align-items: center;
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
