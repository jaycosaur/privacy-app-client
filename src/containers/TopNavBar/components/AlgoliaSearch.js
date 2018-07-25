import React from 'react';
import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

import SearchIcon from '@material-ui/icons/Search'
import InputAdornment from '@material-ui/core/InputAdornment';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DraftsIcon from '@material-ui/icons/Drafts';

import * as searchActions from './../../../store/actions/searchActions'
import { connect } from 'react-redux'

const searchStoreIndex = 'topnav-search'

function renderInput(inputProps) {
    const { classes, ref, ...other } = inputProps
    return (
        <TextField
            fullWidth
            InputProps={{
                inputRef: ref,
                classes: {
                    input: classes.input,
                },
                startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>,
                ...other,
            }}
        />
    );
}

function renderSuggestion(suggestion, { query, isHighlighted }) {
    const matches = match(suggestion.title, query);
    const parts = parse(suggestion.title, matches);

    return (
        <a style={{display: "flex", alignItems: "center", margin: "16px 0px"}} href={suggestion.link} target="_blank">
            <ListItem button style={{flexGrow: 1}}>
                <ListItemIcon>
                    <DraftsIcon />
                </ListItemIcon>
                <ListItemText primary={parts.map((part, index) => {
                return part.highlight ? (
                    <span key={String(index)} style={{ fontWeight: 500 }}>
                    {part.text}
                    </span>
                ) : (
                    <strong key={String(index)} style={{ fontWeight: 300 }}>
                    {part.text}
                    </strong>
                );
                })} secondary="Media & Commentary" />
            </ListItem>
        </a>
    );
}

function renderSuggestionsContainer(options) {
  const { containerProps, children } = options;
  return (
    <Paper {...containerProps} square>
      {children}
    </Paper>
  );
}

function getSuggestionValue(suggestion) {
  return suggestion.title;
}

const styles = theme => ({
    container: {
        width: 500,
    },
    suggestionsContainerOpen: {
        position: 'absolute',
        zIndex: 1,
        marginTop: theme.spacing.unit,
        left: 0,
        right: 0,
        opacity: 0.90
    },
    suggestion: {
        display: 'block',
    },
    suggestionsList: {
        margin: 0,
        padding: 0,
        listStyleType: 'none',
        height: "93vh",
        overflow: "scroll"
    },
});

class IntegrationAutosuggest extends React.Component {
    state = {
        value: '',
        suggestions: [],
        isLoading: false,
    }

    static getDerivedStateFromProps = (props, state) => {
        const { storeRef } = props

        if (storeRef && storeRef.results && storeRef.results.length>0 && storeRef.results !== state.suggestions) {
            return {
                suggestions: storeRef.results
            }
        }
        return null
    }

    handleSuggestionsFetchRequested = ({ value }) => {
        this.props.globalSearch({query: value, key: searchStoreIndex})
    }

    handleSuggestionsClearRequested = () => {
        this.setState({
            suggestions: [],
        });
    }

    handleChange = (event, { newValue }) => {
        this.setState({
            value: newValue,
        });
    }

  render() {
    const { classes } = this.props;
    return (
      <Autosuggest
        theme={{
          container: classes.container,
          suggestionsContainerOpen: classes.suggestionsContainerOpen,
          suggestionsList: classes.suggestionsList,
          suggestion: classes.suggestion,
        }}
        renderInputComponent={renderInput}
        suggestions={this.state.suggestions}
        onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
        renderSuggestionsContainer={renderSuggestionsContainer}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={{
          classes,
          placeholder: 'Looking for something?',
          value: this.state.value,
          onChange: this.handleChange,
        }}
      />
    );
  }
}

IntegrationAutosuggest.propTypes = {
  classes: PropTypes.object.isRequired,
}

const mapStateToProps = (state, ownProps) => {
    return {
        storeRef: state.search[searchStoreIndex]
    }
}

export default connect(mapStateToProps, searchActions)(withStyles(styles)(IntegrationAutosuggest))