import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';

import EnhancedTableToolbar from './components/EnhancedTableToolbar'
import EnhancedTableHead from './components/EnhancedTableHead'

function getSorting(order, orderBy) {
  return order === 'desc'
    ? (a, b) => (b[orderBy] < a[orderBy] ? -1 : 1)
    : (a, b) => (a[orderBy] < b[orderBy] ? -1 : 1);
}

const styles = (theme) => ({
    root: {
        width: '100%',
        borderRadius: 0,
    },
    table: {
        minWidth: 1020,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
});

class EnhancedTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      order: 'asc',
      orderBy: props.columnData[0].id,
      selected: [],
      data: props.data,
      page: 0,
      rowsPerPage: 25,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState){
    if (prevState.data !== nextProps.data) {
      return {
        data: nextProps.data,
      };
    }
    // Return null to indicate no change to state.
    return null;

  } 

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy });
    this.props.handleRequestSort({order, orderBy})
  };

  handleEmitSelect = (item, all) => {
    if (this.props.handleRowSelect){
      this.props.handleRowSelect(item, all)
    }
  }

  handleSelectAllClick = (event, checked) => {
    if (checked) {
      this.setState(state => ({ selected: state.data.map(n => n.id) }));
      this.handleEmitSelect(this.state.data.map(n => n.id), this.handleEmitSelect(this.state.data.map(n => n.id)))
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    this.handleEmitSelect(id, newSelected)
    this.setState({ selected: newSelected });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
    this.props.loadMore(page, this.state.rowsPerPage)
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  clearSelected = () => {
    this.setState({
      selected: []
    })
    this.props.handleRowClearSelected()
  }

  render() {
    const { classes, columnData } = this.props;
    const { order, orderBy, selected, rowsPerPage, page } = this.state;

    const TablePaginationRow = () => <TablePagination
      component="div"
      count={this.props.numberOfResults}
      rowsPerPage={rowsPerPage}
      page={page}
      backIconButtonProps={{
        'aria-label': 'Previous Page',
      }}
      nextIconButtonProps={{
        'aria-label': 'Next Page',
      }}
      onChangePage={this.handleChangePage}
      onChangeRowsPerPage={this.handleChangeRowsPerPage}
      rowsPerPageOptions={[10,25,50,100]}
    />
    return (
      <Paper className={classes.root}>
        {selected.length>0&&<EnhancedTableToolbar clearSelected={this.clearSelected} numSelected={selected.length} />}
        <TablePaginationRow />
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle" padding="dense">
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={this.state.data?this.state.data.length:0}
              columnData={columnData}
              key="table-head"
            />
            <TableBody key="table-body">
              {this.state.data&&this.state.data
                .sort(getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((n,j) => {
                  const isSelected = this.state.selected.indexOf(n.id)!==-1;
                  return (
                    <TableRow
                      hover
                      onClick={event => this.handleClick(event, n.id)}
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={-1}
                      key={n.id}
                      selected={isSelected}
                    >
                        <TableCell padding="checkbox">
                            <Checkbox checked={isSelected} />
                        </TableCell>
                        {columnData.map((col,i)=>(
                            <TableCell 
                                numeric={col.numeric}
                                padding={col.padding||"default"}
                                >
                                {col.linkKey?
                                <a href={n[col.linkKey]} target="_blank">
                                  {col.isChip
                                  ?<Chip label={col.shrinkText?<small style={{color: "#ccc"}}>{n[col.id]}. </small>:n[col.id]}/>
                                  :col.shrinkText?<small style={{color: "#ccc"}}>{n[col.id]}. </small>:(i===0?`${j+1+page * rowsPerPage}. ${n[col.id]}`:n[col.id])}
                                </a>
                                :col.isChip?<Chip label={col.shrinkText?<small>{n[col.id]}</small>:n[col.id]}/>:col.shrinkText?<small style={{color: "#ccc"}}>{n[col.id]}. </small>:n[col.id]
                                }
                            </TableCell>))
                        }
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </div>
        <TablePaginationRow />
      </Paper>
    );
  }
}

// make this much tighter for columnData and data.

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired,
  columnData: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  showHeader: PropTypes.bool
};

export default withStyles(styles)(EnhancedTable);