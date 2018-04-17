var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import _ from './utils';

export default (function (Base) {
  return function (_Base) {
    _inherits(_class, _Base);

    function _class() {
      _classCallCheck(this, _class);

      return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
    }

    _createClass(_class, [{
      key: 'getResolvedState',
      value: function getResolvedState(props, state) {
        var resolvedState = _extends({}, _.compactObject(this.state), _.compactObject(this.props), _.compactObject(state), _.compactObject(props));
        return resolvedState;
      }
    }, {
      key: 'getDataModel',
      value: function getDataModel(newState) {
        var _this2 = this;

        var columns = newState.columns,
            _newState$pivotBy = newState.pivotBy,
            pivotBy = _newState$pivotBy === undefined ? [] : _newState$pivotBy,
            data = newState.data,
            pivotIDKey = newState.pivotIDKey,
            pivotValKey = newState.pivotValKey,
            subRowsKey = newState.subRowsKey,
            aggregatedKey = newState.aggregatedKey,
            nestingLevelKey = newState.nestingLevelKey,
            originalKey = newState.originalKey,
            indexKey = newState.indexKey,
            groupedByPivotKey = newState.groupedByPivotKey,
            SubComponent = newState.SubComponent;

        // Determine Header Groups

        var hasHeaderGroups = false;
        columns.forEach(function (column) {
          if (column.columns) {
            hasHeaderGroups = true;
          }
        });

        var columnsWithExpander = [].concat(_toConsumableArray(columns));

        var expanderColumn = columns.find(function (col) {
          return col.expander || col.columns && col.columns.some(function (col2) {
            return col2.expander;
          });
        });
        // The actual expander might be in the columns field of a group column
        if (expanderColumn && !expanderColumn.expander) {
          expanderColumn = expanderColumn.columns.find(function (col) {
            return col.expander;
          });
        }

        // If we have SubComponent's we need to make sure we have an expander column
        if (SubComponent && !expanderColumn) {
          expanderColumn = { expander: true };
          columnsWithExpander = [expanderColumn].concat(_toConsumableArray(columnsWithExpander));
        }

        var makeDecoratedColumn = function makeDecoratedColumn(column, parentColumn) {
          var dcol = void 0;
          if (column.expander) {
            dcol = _extends({}, _this2.props.column, _this2.props.expanderDefaults, column);
          } else {
            dcol = _extends({}, _this2.props.column, column);
          }

          // Ensure minWidth is not greater than maxWidth if set
          if (dcol.maxWidth < dcol.minWidth) {
            dcol.minWidth = dcol.maxWidth;
          }

          if (parentColumn) {
            dcol.parentColumn = parentColumn;
          }

          // First check for string accessor
          if (typeof dcol.accessor === 'string') {
            dcol.id = dcol.id || dcol.accessor;
            var accessorString = dcol.accessor;
            dcol.accessor = function (row) {
              return _.get(row, accessorString);
            };
            return dcol;
          }

          // Fall back to functional accessor (but require an ID)
          if (dcol.accessor && !dcol.id) {
            console.warn(dcol);
            throw new Error('A column id is required if using a non-string accessor for column above.');
          }

          // Fall back to an undefined accessor
          if (!dcol.accessor) {
            dcol.accessor = function () {
              return undefined;
            };
          }

          return dcol;
        };

        var allDecoratedColumns = [];

        // Decorate the columns
        var decorateAndAddToAll = function decorateAndAddToAll(column, parentColumn) {
          var decoratedColumn = makeDecoratedColumn(column, parentColumn);
          allDecoratedColumns.push(decoratedColumn);
          return decoratedColumn;
        };

        var decoratedColumns = columnsWithExpander.map(function (column) {
          if (column.columns) {
            return _extends({}, column, {
              columns: column.columns.map(function (d) {
                return decorateAndAddToAll(d, column);
              })
            });
          }
          return decorateAndAddToAll(column);
        });

        // Build the visible columns, headers and flat column list
        var visibleColumns = decoratedColumns.slice();
        var allVisibleColumns = [];

        visibleColumns = visibleColumns.map(function (column) {
          if (column.columns) {
            var visibleSubColumns = column.columns.filter(function (d) {
              return pivotBy.indexOf(d.id) > -1 ? false : _.getFirstDefined(d.show, true);
            });
            return _extends({}, column, {
              columns: visibleSubColumns
            });
          }
          return column;
        });

        visibleColumns = visibleColumns.filter(function (column) {
          return column.columns ? column.columns.length : pivotBy.indexOf(column.id) > -1 ? false : _.getFirstDefined(column.show, true);
        });

        // Find any custom pivot location
        var pivotIndex = visibleColumns.findIndex(function (col) {
          return col.pivot;
        });

        // Handle Pivot Columns
        if (pivotBy.length) {
          // Retrieve the pivot columns in the correct pivot order
          var pivotColumns = [];
          pivotBy.forEach(function (pivotID) {
            var found = allDecoratedColumns.find(function (d) {
              return d.id === pivotID;
            });
            if (found) {
              pivotColumns.push(found);
            }
          });

          var PivotParentColumn = pivotColumns.reduce(function (prev, current) {
            return prev && prev === current.parentColumn && current.parentColumn;
          }, pivotColumns[0].parentColumn);

          var PivotGroupHeader = hasHeaderGroups && PivotParentColumn.Header;
          PivotGroupHeader = PivotGroupHeader || function () {
            return React.createElement(
              'strong',
              null,
              'Pivoted'
            );
          };

          var pivotColumnGroup = {
            Header: PivotGroupHeader,
            columns: pivotColumns.map(function (col) {
              return _extends({}, _this2.props.pivotDefaults, col, {
                pivoted: true
              });
            })
          };

          // Place the pivotColumns back into the visibleColumns
          if (pivotIndex >= 0) {
            pivotColumnGroup = _extends({}, visibleColumns[pivotIndex], pivotColumnGroup);
            visibleColumns.splice(pivotIndex, 1, pivotColumnGroup);
          } else {
            visibleColumns.unshift(pivotColumnGroup);
          }
        }

        // Build Header Groups
        var headerGroups = [];
        var currentSpan = [];

        // A convenience function to add a header and reset the currentSpan
        var addHeader = function addHeader(columns, column) {
          headerGroups.push(_extends({}, _this2.props.column, column, {
            columns: columns
          }));
          currentSpan = [];
        };

        // Build flast list of allVisibleColumns and HeaderGroups
        visibleColumns.forEach(function (column) {
          if (column.columns) {
            allVisibleColumns = allVisibleColumns.concat(column.columns);
            if (currentSpan.length > 0) {
              addHeader(currentSpan);
            }
            addHeader(column.columns, column);
            return;
          }
          allVisibleColumns.push(column);
          currentSpan.push(column);
        });
        if (hasHeaderGroups && currentSpan.length > 0) {
          addHeader(currentSpan);
        }

        // Access the data
        var accessRow = function accessRow(d, i) {
          var _row;

          var level = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

          var row = (_row = {}, _defineProperty(_row, originalKey, d), _defineProperty(_row, indexKey, i), _defineProperty(_row, subRowsKey, d[subRowsKey]), _defineProperty(_row, nestingLevelKey, level), _row);
          allDecoratedColumns.forEach(function (column) {
            if (column.expander) return;
            row[column.id] = column.accessor(d);
          });
          if (row[subRowsKey]) {
            row[subRowsKey] = row[subRowsKey].map(function (d, i) {
              return accessRow(d, i, level + 1);
            });
          }
          return row;
        };
        var resolvedData = data.map(function (d, i) {
          return accessRow(d, i);
        });

        // TODO: Make it possible to fabricate nested rows without pivoting
        var aggregatingColumns = allVisibleColumns.filter(function (d) {
          return !d.expander && d.aggregate;
        });

        // If pivoting, recursively group the data
        var aggregate = function aggregate(rows) {
          var aggregationValues = {};
          aggregatingColumns.forEach(function (column) {
            var values = rows.map(function (d) {
              return d[column.id];
            });
            aggregationValues[column.id] = column.aggregate(values, rows);
          });
          return aggregationValues;
        };
        if (pivotBy.length) {
          var groupRecursively = function groupRecursively(rows, keys) {
            var i = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

            // This is the last level, just return the rows
            if (i === keys.length) {
              return rows;
            }
            // Group the rows together for this level
            var groupedRows = Object.entries(_.groupBy(rows, keys[i])).map(function (_ref) {
              var _ref3;

              var _ref2 = _slicedToArray(_ref, 2),
                  key = _ref2[0],
                  value = _ref2[1];

              return _ref3 = {}, _defineProperty(_ref3, pivotIDKey, keys[i]), _defineProperty(_ref3, pivotValKey, key), _defineProperty(_ref3, keys[i], key), _defineProperty(_ref3, subRowsKey, value), _defineProperty(_ref3, nestingLevelKey, i), _defineProperty(_ref3, groupedByPivotKey, true), _ref3;
            });
            // Recurse into the subRows
            groupedRows = groupedRows.map(function (rowGroup) {
              var _extends2;

              var subRows = groupRecursively(rowGroup[subRowsKey], keys, i + 1);
              return _extends({}, rowGroup, (_extends2 = {}, _defineProperty(_extends2, subRowsKey, subRows), _defineProperty(_extends2, aggregatedKey, true), _extends2), aggregate(subRows));
            });
            return groupedRows;
          };
          resolvedData = groupRecursively(resolvedData, pivotBy);
        }

        return _extends({}, newState, {
          resolvedData: resolvedData,
          allVisibleColumns: allVisibleColumns,
          headerGroups: headerGroups,
          allDecoratedColumns: allDecoratedColumns,
          hasHeaderGroups: hasHeaderGroups
        });
      }
    }, {
      key: 'getSortedData',
      value: function getSortedData(resolvedState) {
        var manual = resolvedState.manual,
            sorted = resolvedState.sorted,
            filtered = resolvedState.filtered,
            defaultFilterMethod = resolvedState.defaultFilterMethod,
            resolvedData = resolvedState.resolvedData,
            allVisibleColumns = resolvedState.allVisibleColumns,
            allDecoratedColumns = resolvedState.allDecoratedColumns;


        var sortMethodsByColumnID = {};

        allDecoratedColumns.filter(function (col) {
          return col.sortMethod;
        }).forEach(function (col) {
          sortMethodsByColumnID[col.id] = col.sortMethod;
        });

        // Resolve the data from either manual data or sorted data
        return {
          sortedData: manual ? resolvedData : this.sortData(this.filterData(resolvedData, filtered, defaultFilterMethod, allVisibleColumns), sorted, sortMethodsByColumnID)
        };
      }
    }, {
      key: 'fireFetchData',
      value: function fireFetchData() {
        this.props.onFetchData(this.getResolvedState(), this);
      }
    }, {
      key: 'getPropOrState',
      value: function getPropOrState(key) {
        return _.getFirstDefined(this.props[key], this.state[key]);
      }
    }, {
      key: 'getStateOrProp',
      value: function getStateOrProp(key) {
        return _.getFirstDefined(this.state[key], this.props[key]);
      }
    }, {
      key: 'filterData',
      value: function filterData(data, filtered, defaultFilterMethod, allVisibleColumns) {
        var _this3 = this;

        var filteredData = data;

        if (filtered.length) {
          filteredData = filtered.reduce(function (filteredSoFar, nextFilter) {
            var column = allVisibleColumns.find(function (x) {
              return x.id === nextFilter.id;
            });

            // Don't filter hidden columns or columns that have had their filters disabled
            if (!column || column.filterable === false) {
              return filteredSoFar;
            }

            var filterMethod = column.filterMethod || defaultFilterMethod;

            // If 'filterAll' is set to true, pass the entire dataset to the filter method
            if (column.filterAll) {
              return filterMethod(nextFilter, filteredSoFar, column);
            }
            return filteredSoFar.filter(function (row) {
              return filterMethod(nextFilter, row, column);
            });
          }, filteredData);

          // Apply the filter to the subrows if we are pivoting, and then
          // filter any rows without subcolumns because it would be strange to show
          filteredData = filteredData.map(function (row) {
            if (!row[_this3.props.subRowsKey]) {
              return row;
            }
            return _extends({}, row, _defineProperty({}, _this3.props.subRowsKey, _this3.filterData(row[_this3.props.subRowsKey], filtered, defaultFilterMethod, allVisibleColumns)));
          }).filter(function (row) {
            if (!row[_this3.props.subRowsKey]) {
              return true;
            }
            return row[_this3.props.subRowsKey].length > 0;
          });
        }

        return filteredData;
      }
    }, {
      key: 'sortData',
      value: function sortData(data, sorted) {
        var _this4 = this;

        var sortMethodsByColumnID = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

        if (!sorted.length) {
          return data;
        }

        var sortedData = (this.props.orderByMethod || _.orderBy)(data, sorted.map(function (sort) {
          // Support custom sorting methods for each column
          if (sortMethodsByColumnID[sort.id]) {
            return function (a, b) {
              return sortMethodsByColumnID[sort.id](a[sort.id], b[sort.id], sort.desc);
            };
          }
          return function (a, b) {
            return _this4.props.defaultSortMethod(a[sort.id], b[sort.id], sort.desc);
          };
        }), sorted.map(function (d) {
          return !d.desc;
        }), this.props.indexKey);

        sortedData.forEach(function (row) {
          if (!row[_this4.props.subRowsKey]) {
            return;
          }
          row[_this4.props.subRowsKey] = _this4.sortData(row[_this4.props.subRowsKey], sorted, sortMethodsByColumnID);
        });

        return sortedData;
      }
    }, {
      key: 'getMinRows',
      value: function getMinRows() {
        return _.getFirstDefined(this.props.minRows, this.getStateOrProp('pageSize'));
      }

      // User actions

    }, {
      key: 'onPageChange',
      value: function onPageChange(page) {
        var _props = this.props,
            onPageChange = _props.onPageChange,
            collapseOnPageChange = _props.collapseOnPageChange;


        var newState = { page: page };
        if (collapseOnPageChange) {
          newState.expanded = {};
        }
        this.setStateWithData(newState, function () {
          return onPageChange && onPageChange(page);
        });
      }
    }, {
      key: 'onPageSizeChange',
      value: function onPageSizeChange(newPageSize) {
        var onPageSizeChange = this.props.onPageSizeChange;

        var _getResolvedState = this.getResolvedState(),
            pageSize = _getResolvedState.pageSize,
            page = _getResolvedState.page;

        // Normalize the page to display


        var currentRow = pageSize * page;
        var newPage = Math.floor(currentRow / newPageSize);

        this.setStateWithData({
          pageSize: newPageSize,
          page: newPage
        }, function () {
          return onPageSizeChange && onPageSizeChange(newPageSize, newPage);
        });
      }
    }, {
      key: 'sortColumn',
      value: function sortColumn(column, additive) {
        var _getResolvedState2 = this.getResolvedState(),
            sorted = _getResolvedState2.sorted,
            skipNextSort = _getResolvedState2.skipNextSort,
            defaultSortDesc = _getResolvedState2.defaultSortDesc;

        var firstSortDirection = Object.prototype.hasOwnProperty.call(column, 'defaultSortDesc') ? column.defaultSortDesc : defaultSortDesc;
        var secondSortDirection = !firstSortDirection;

        // we can't stop event propagation from the column resize move handlers
        // attached to the document because of react's synthetic events
        // so we have to prevent the sort function from actually sorting
        // if we click on the column resize element within a header.
        if (skipNextSort) {
          this.setStateWithData({
            skipNextSort: false
          });
          return;
        }

        var onSortedChange = this.props.onSortedChange;


        var newSorted = _.clone(sorted || []).map(function (d) {
          d.desc = _.isSortingDesc(d);
          return d;
        });
        if (!_.isArray(column)) {
          // Single-Sort
          var existingIndex = newSorted.findIndex(function (d) {
            return d.id === column.id;
          });
          if (existingIndex > -1) {
            var existing = newSorted[existingIndex];
            if (existing.desc === secondSortDirection) {
              if (additive) {
                newSorted.splice(existingIndex, 1);
              } else {
                existing.desc = firstSortDirection;
                newSorted = [existing];
              }
            } else {
              existing.desc = secondSortDirection;
              if (!additive) {
                newSorted = [existing];
              }
            }
          } else if (additive) {
            newSorted.push({
              id: column.id,
              desc: firstSortDirection
            });
          } else {
            newSorted = [{
              id: column.id,
              desc: firstSortDirection
            }];
          }
        } else {
          // Multi-Sort
          var _existingIndex = newSorted.findIndex(function (d) {
            return d.id === column[0].id;
          });
          // Existing Sorted Column
          if (_existingIndex > -1) {
            var _existing = newSorted[_existingIndex];
            if (_existing.desc === secondSortDirection) {
              if (additive) {
                newSorted.splice(_existingIndex, column.length);
              } else {
                column.forEach(function (d, i) {
                  newSorted[_existingIndex + i].desc = firstSortDirection;
                });
              }
            } else {
              column.forEach(function (d, i) {
                newSorted[_existingIndex + i].desc = secondSortDirection;
              });
            }
            if (!additive) {
              newSorted = newSorted.slice(_existingIndex, column.length);
            }
            // New Sort Column
          } else if (additive) {
            newSorted = newSorted.concat(column.map(function (d) {
              return {
                id: d.id,
                desc: firstSortDirection
              };
            }));
          } else {
            newSorted = column.map(function (d) {
              return {
                id: d.id,
                desc: firstSortDirection
              };
            });
          }
        }

        this.setStateWithData({
          page: !sorted.length && newSorted.length || !additive ? 0 : this.state.page,
          sorted: newSorted
        }, function () {
          return onSortedChange && onSortedChange(newSorted, column, additive);
        });
      }
    }, {
      key: 'filterColumn',
      value: function filterColumn(column, value) {
        var _getResolvedState3 = this.getResolvedState(),
            filtered = _getResolvedState3.filtered;

        var onFilteredChange = this.props.onFilteredChange;

        // Remove old filter first if it exists

        var newFiltering = (filtered || []).filter(function (x) {
          return x.id !== column.id;
        });

        if (value !== '') {
          newFiltering.push({
            id: column.id,
            value: value
          });
        }

        this.setStateWithData({
          filtered: newFiltering
        }, function () {
          return onFilteredChange && onFilteredChange(newFiltering, column, value);
        });
      }
    }, {
      key: 'resizeColumnStart',
      value: function resizeColumnStart(event, column, isTouch) {
        var _this5 = this;

        event.stopPropagation();
        var parentWidth = event.target.parentElement.getBoundingClientRect().width;

        var pageX = void 0;
        if (isTouch) {
          pageX = event.changedTouches[0].pageX;
        } else {
          pageX = event.pageX;
        }

        this.trapEvents = true;
        this.setStateWithData({
          currentlyResizing: {
            id: column.id,
            startX: pageX,
            parentWidth: parentWidth
          }
        }, function () {
          if (isTouch) {
            document.addEventListener('touchmove', _this5.resizeColumnMoving);
            document.addEventListener('touchcancel', _this5.resizeColumnEnd);
            document.addEventListener('touchend', _this5.resizeColumnEnd);
          } else {
            document.addEventListener('mousemove', _this5.resizeColumnMoving);
            document.addEventListener('mouseup', _this5.resizeColumnEnd);
            document.addEventListener('mouseleave', _this5.resizeColumnEnd);
          }
        });
      }
    }, {
      key: 'resizeColumnMoving',
      value: function resizeColumnMoving(event) {
        event.stopPropagation();
        var onResizedChange = this.props.onResizedChange;

        var _getResolvedState4 = this.getResolvedState(),
            resized = _getResolvedState4.resized,
            currentlyResizing = _getResolvedState4.currentlyResizing;

        // Delete old value


        var newResized = resized.filter(function (x) {
          return x.id !== currentlyResizing.id;
        });

        var pageX = void 0;

        if (event.type === 'touchmove') {
          pageX = event.changedTouches[0].pageX;
        } else if (event.type === 'mousemove') {
          pageX = event.pageX;
        }

        // Set the min size to 10 to account for margin and border or else the
        // group headers don't line up correctly
        var newWidth = Math.max(currentlyResizing.parentWidth + pageX - currentlyResizing.startX, 11);

        newResized.push({
          id: currentlyResizing.id,
          value: newWidth
        });

        this.setStateWithData({
          resized: newResized
        }, function () {
          return onResizedChange && onResizedChange(newResized, event);
        });
      }
    }, {
      key: 'resizeColumnEnd',
      value: function resizeColumnEnd(event) {
        event.stopPropagation();
        var isTouch = event.type === 'touchend' || event.type === 'touchcancel';

        if (isTouch) {
          document.removeEventListener('touchmove', this.resizeColumnMoving);
          document.removeEventListener('touchcancel', this.resizeColumnEnd);
          document.removeEventListener('touchend', this.resizeColumnEnd);
        }

        // If its a touch event clear the mouse one's as well because sometimes
        // the mouseDown event gets called as well, but the mouseUp event doesn't
        document.removeEventListener('mousemove', this.resizeColumnMoving);
        document.removeEventListener('mouseup', this.resizeColumnEnd);
        document.removeEventListener('mouseleave', this.resizeColumnEnd);

        // The touch events don't propagate up to the sorting's onMouseDown event so
        // no need to prevent it from happening or else the first click after a touch
        // event resize will not sort the column.
        if (!isTouch) {
          this.setStateWithData({
            skipNextSort: true,
            currentlyResizing: false
          });
        }
      }
    }]);

    return _class;
  }(Base);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tZXRob2RzLmpzIl0sIm5hbWVzIjpbIlJlYWN0IiwiXyIsInByb3BzIiwic3RhdGUiLCJyZXNvbHZlZFN0YXRlIiwiY29tcGFjdE9iamVjdCIsIm5ld1N0YXRlIiwiY29sdW1ucyIsInBpdm90QnkiLCJkYXRhIiwicGl2b3RJREtleSIsInBpdm90VmFsS2V5Iiwic3ViUm93c0tleSIsImFnZ3JlZ2F0ZWRLZXkiLCJuZXN0aW5nTGV2ZWxLZXkiLCJvcmlnaW5hbEtleSIsImluZGV4S2V5IiwiZ3JvdXBlZEJ5UGl2b3RLZXkiLCJTdWJDb21wb25lbnQiLCJoYXNIZWFkZXJHcm91cHMiLCJmb3JFYWNoIiwiY29sdW1uIiwiY29sdW1uc1dpdGhFeHBhbmRlciIsImV4cGFuZGVyQ29sdW1uIiwiZmluZCIsImNvbCIsImV4cGFuZGVyIiwic29tZSIsImNvbDIiLCJtYWtlRGVjb3JhdGVkQ29sdW1uIiwicGFyZW50Q29sdW1uIiwiZGNvbCIsImV4cGFuZGVyRGVmYXVsdHMiLCJtYXhXaWR0aCIsIm1pbldpZHRoIiwiYWNjZXNzb3IiLCJpZCIsImFjY2Vzc29yU3RyaW5nIiwiZ2V0Iiwicm93IiwiY29uc29sZSIsIndhcm4iLCJFcnJvciIsInVuZGVmaW5lZCIsImFsbERlY29yYXRlZENvbHVtbnMiLCJkZWNvcmF0ZUFuZEFkZFRvQWxsIiwiZGVjb3JhdGVkQ29sdW1uIiwicHVzaCIsImRlY29yYXRlZENvbHVtbnMiLCJtYXAiLCJkIiwidmlzaWJsZUNvbHVtbnMiLCJzbGljZSIsImFsbFZpc2libGVDb2x1bW5zIiwidmlzaWJsZVN1YkNvbHVtbnMiLCJmaWx0ZXIiLCJpbmRleE9mIiwiZ2V0Rmlyc3REZWZpbmVkIiwic2hvdyIsImxlbmd0aCIsInBpdm90SW5kZXgiLCJmaW5kSW5kZXgiLCJwaXZvdCIsInBpdm90Q29sdW1ucyIsImZvdW5kIiwicGl2b3RJRCIsIlBpdm90UGFyZW50Q29sdW1uIiwicmVkdWNlIiwicHJldiIsImN1cnJlbnQiLCJQaXZvdEdyb3VwSGVhZGVyIiwiSGVhZGVyIiwicGl2b3RDb2x1bW5Hcm91cCIsInBpdm90RGVmYXVsdHMiLCJwaXZvdGVkIiwic3BsaWNlIiwidW5zaGlmdCIsImhlYWRlckdyb3VwcyIsImN1cnJlbnRTcGFuIiwiYWRkSGVhZGVyIiwiY29uY2F0IiwiYWNjZXNzUm93IiwiaSIsImxldmVsIiwicmVzb2x2ZWREYXRhIiwiYWdncmVnYXRpbmdDb2x1bW5zIiwiYWdncmVnYXRlIiwiYWdncmVnYXRpb25WYWx1ZXMiLCJ2YWx1ZXMiLCJyb3dzIiwiZ3JvdXBSZWN1cnNpdmVseSIsImtleXMiLCJncm91cGVkUm93cyIsIk9iamVjdCIsImVudHJpZXMiLCJncm91cEJ5Iiwia2V5IiwidmFsdWUiLCJzdWJSb3dzIiwicm93R3JvdXAiLCJtYW51YWwiLCJzb3J0ZWQiLCJmaWx0ZXJlZCIsImRlZmF1bHRGaWx0ZXJNZXRob2QiLCJzb3J0TWV0aG9kc0J5Q29sdW1uSUQiLCJzb3J0TWV0aG9kIiwic29ydGVkRGF0YSIsInNvcnREYXRhIiwiZmlsdGVyRGF0YSIsIm9uRmV0Y2hEYXRhIiwiZ2V0UmVzb2x2ZWRTdGF0ZSIsImZpbHRlcmVkRGF0YSIsImZpbHRlcmVkU29GYXIiLCJuZXh0RmlsdGVyIiwieCIsImZpbHRlcmFibGUiLCJmaWx0ZXJNZXRob2QiLCJmaWx0ZXJBbGwiLCJvcmRlckJ5TWV0aG9kIiwib3JkZXJCeSIsInNvcnQiLCJhIiwiYiIsImRlc2MiLCJkZWZhdWx0U29ydE1ldGhvZCIsIm1pblJvd3MiLCJnZXRTdGF0ZU9yUHJvcCIsInBhZ2UiLCJvblBhZ2VDaGFuZ2UiLCJjb2xsYXBzZU9uUGFnZUNoYW5nZSIsImV4cGFuZGVkIiwic2V0U3RhdGVXaXRoRGF0YSIsIm5ld1BhZ2VTaXplIiwib25QYWdlU2l6ZUNoYW5nZSIsInBhZ2VTaXplIiwiY3VycmVudFJvdyIsIm5ld1BhZ2UiLCJNYXRoIiwiZmxvb3IiLCJhZGRpdGl2ZSIsInNraXBOZXh0U29ydCIsImRlZmF1bHRTb3J0RGVzYyIsImZpcnN0U29ydERpcmVjdGlvbiIsInByb3RvdHlwZSIsImhhc093blByb3BlcnR5IiwiY2FsbCIsInNlY29uZFNvcnREaXJlY3Rpb24iLCJvblNvcnRlZENoYW5nZSIsIm5ld1NvcnRlZCIsImNsb25lIiwiaXNTb3J0aW5nRGVzYyIsImlzQXJyYXkiLCJleGlzdGluZ0luZGV4IiwiZXhpc3RpbmciLCJvbkZpbHRlcmVkQ2hhbmdlIiwibmV3RmlsdGVyaW5nIiwiZXZlbnQiLCJpc1RvdWNoIiwic3RvcFByb3BhZ2F0aW9uIiwicGFyZW50V2lkdGgiLCJ0YXJnZXQiLCJwYXJlbnRFbGVtZW50IiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0Iiwid2lkdGgiLCJwYWdlWCIsImNoYW5nZWRUb3VjaGVzIiwidHJhcEV2ZW50cyIsImN1cnJlbnRseVJlc2l6aW5nIiwic3RhcnRYIiwiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwicmVzaXplQ29sdW1uTW92aW5nIiwicmVzaXplQ29sdW1uRW5kIiwib25SZXNpemVkQ2hhbmdlIiwicmVzaXplZCIsIm5ld1Jlc2l6ZWQiLCJ0eXBlIiwibmV3V2lkdGgiLCJtYXgiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiQmFzZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE9BQU9BLEtBQVAsTUFBa0IsT0FBbEI7QUFDQSxPQUFPQyxDQUFQLE1BQWMsU0FBZDs7QUFFQSxnQkFBZTtBQUFBO0FBQUE7O0FBQUE7QUFBQTs7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQSx1Q0FFT0MsS0FGUCxFQUVjQyxLQUZkLEVBRXFCO0FBQzlCLFlBQU1DLDZCQUNESCxFQUFFSSxhQUFGLENBQWdCLEtBQUtGLEtBQXJCLENBREMsRUFFREYsRUFBRUksYUFBRixDQUFnQixLQUFLSCxLQUFyQixDQUZDLEVBR0RELEVBQUVJLGFBQUYsQ0FBZ0JGLEtBQWhCLENBSEMsRUFJREYsRUFBRUksYUFBRixDQUFnQkgsS0FBaEIsQ0FKQyxDQUFOO0FBTUEsZUFBT0UsYUFBUDtBQUNEO0FBVlU7QUFB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LENBQTZCLFlBQTdCLEVBQTJDLEtBQUtQLGVBQWhEOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFlBQUksQ0FBQ2YsT0FBTCxFQUFjO0FBQ1osZUFBSzFCLGdCQUFMLENBQXNCO0FBQ3BCUywwQkFBYyxJQURNO0FBRXBCMkIsK0JBQW1CO0FBRkMsV0FBdEI7QUFJRDtBQUNGO0FBaHNCVTs7QUFBQTtBQUFBLElBQ0NhLElBREQ7QUFBQSxDQUFmIiwiZmlsZSI6Im1ldGhvZHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgXyBmcm9tICcuL3V0aWxzJ1xuXG5leHBvcnQgZGVmYXVsdCBCYXNlID0+XG4gIGNsYXNzIGV4dGVuZHMgQmFzZSB7XG4gICAgZ2V0UmVzb2x2ZWRTdGF0ZSAocHJvcHMsIHN0YXRlKSB7XG4gICAgICBjb25zdCByZXNvbHZlZFN0YXRlID0ge1xuICAgICAgICAuLi5fLmNvbXBhY3RPYmplY3QodGhpcy5zdGF0ZSksXG4gICAgICAgIC4uLl8uY29tcGFjdE9iamVjdCh0aGlzLnByb3BzKSxcbiAgICAgICAgLi4uXy5jb21wYWN0T2JqZWN0KHN0YXRlKSxcbiAgICAgICAgLi4uXy5jb21wYWN0T2JqZWN0KHByb3BzKSxcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXNvbHZlZFN0YXRlXG4gICAgfVxuXG4gICAgZ2V0RGF0YU1vZGVsIChuZXdTdGF0ZSkge1xuICAgICAgY29uc3Qge1xuICAgICAgICBjb2x1bW5zLFxuICAgICAgICBwaXZvdEJ5ID0gW10sXG4gICAgICAgIGRhdGEsXG4gICAgICAgIHBpdm90SURLZXksXG4gICAgICAgIHBpdm90VmFsS2V5LFxuICAgICAgICBzdWJSb3dzS2V5LFxuICAgICAgICBhZ2dyZWdhdGVkS2V5LFxuICAgICAgICBuZXN0aW5nTGV2ZWxLZXksXG4gICAgICAgIG9yaWdpbmFsS2V5LFxuICAgICAgICBpbmRleEtleSxcbiAgICAgICAgZ3JvdXBlZEJ5UGl2b3RLZXksXG4gICAgICAgIFN1YkNvbXBvbmVudCxcbiAgICAgIH0gPSBuZXdTdGF0ZVxuXG4gICAgICAvLyBEZXRlcm1pbmUgSGVhZGVyIEdyb3Vwc1xuICAgICAgbGV0IGhhc0hlYWRlckdyb3VwcyA9IGZhbHNlXG4gICAgICBjb2x1bW5zLmZvckVhY2goY29sdW1uID0+IHtcbiAgICAgICAgaWYgKGNvbHVtbi5jb2x1bW5zKSB7XG4gICAgICAgICAgaGFzSGVhZGVyR3JvdXBzID0gdHJ1ZVxuICAgICAgICB9XG4gICAgICB9KVxuXG4gICAgICBsZXQgY29sdW1uc1dpdGhFeHBhbmRlciA9IFsuLi5jb2x1bW5zXVxuXG4gICAgICBsZXQgZXhwYW5kZXJDb2x1bW4gPSBjb2x1bW5zLmZpbmQoXG4gICAgICAgIGNvbCA9PlxuICAgICAgICAgIGNvbC5leHBhbmRlciB8fFxuICAgICAgICAgIChjb2wuY29sdW1ucyAmJiBjb2wuY29sdW1ucy5zb21lKGNvbDIgPT4gY29sMi5leHBhbmRlcikpLFxuICAgICAgKVxuICAgICAgLy8gVGhlIGFjdHVhbCBleHBhbmRlciBtaWdodCBiZSBpbiB0aGUgY29sdW1ucyBmaWVsZCBvZiBhIGdyb3VwIGNvbHVtblxuICAgICAgaWYgKGV4cGFuZGVyQ29sdW1uICYmICFleHBhbmRlckNvbHVtbi5leHBhbmRlcikge1xuICAgICAgICBleHBhbmRlckNvbHVtbiA9IGV4cGFuZGVyQ29sdW1uLmNvbHVtbnMuZmluZChjb2wgPT4gY29sLmV4cGFuZGVyKVxuICAgICAgfVxuXG4gICAgICAvLyBJZiB3ZSBoYXZlIFN1YkNvbXBvbmVudCdzIHdlIG5lZWQgdG8gbWFrZSBzdXJlIHdlIGhhdmUgYW4gZXhwYW5kZXIgY29sdW1uXG4gICAgICBpZiAoU3ViQ29tcG9uZW50ICYmICFleHBhbmRlckNvbHVtbikge1xuICAgICAgICBleHBhbmRlckNvbHVtbiA9IHsgZXhwYW5kZXI6IHRydWUgfVxuICAgICAgICBjb2x1bW5zV2l0aEV4cGFuZGVyID0gW2V4cGFuZGVyQ29sdW1uLCAuLi5jb2x1bW5zV2l0aEV4cGFuZGVyXVxuICAgICAgfVxuXG4gICAgICBjb25zdCBtYWtlRGVjb3JhdGVkQ29sdW1uID0gKGNvbHVtbiwgcGFyZW50Q29sdW1uKSA9PiB7XG4gICAgICAgIGxldCBkY29sXG4gICAgICAgIGlmIChjb2x1bW4uZXhwYW5kZXIpIHtcbiAgICAgICAgICBkY29sID0ge1xuICAgICAgICAgICAgLi4udGhpcy5wcm9wcy5jb2x1bW4sXG4gICAgICAgICAgICAuLi50aGlzLnByb3BzLmV4cGFuZGVyRGVmYXVsdHMsXG4gICAgICAgICAgICAuLi5jb2x1bW4sXG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGRjb2wgPSB7XG4gICAgICAgICAgICAuLi50aGlzLnByb3BzLmNvbHVtbixcbiAgICAgICAgICAgIC4uLmNvbHVtbixcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBFbnN1cmUgbWluV2lkdGggaXMgbm90IGdyZWF0ZXIgdGhhbiBtYXhXaWR0aCBpZiBzZXRcbiAgICAgICAgaWYgKGRjb2wubWF4V2lkdGggPCBkY29sLm1pbldpZHRoKSB7XG4gICAgICAgICAgZGNvbC5taW5XaWR0aCA9IGRjb2wubWF4V2lkdGhcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwYXJlbnRDb2x1bW4pIHtcbiAgICAgICAgICBkY29sLnBhcmVudENvbHVtbiA9IHBhcmVudENvbHVtblxuICAgICAgICB9XG5cbiAgICAgICAgLy8gRmlyc3QgY2hlY2sgZm9yIHN0cmluZyBhY2Nlc3NvclxuICAgICAgICBpZiAodHlwZW9mIGRjb2wuYWNjZXNzb3IgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgZGNvbC5pZCA9IGRjb2wuaWQgfHwgZGNvbC5hY2Nlc3NvclxuICAgICAgICAgIGNvbnN0IGFjY2Vzc29yU3RyaW5nID0gZGNvbC5hY2Nlc3NvclxuICAgICAgICAgIGRjb2wuYWNjZXNzb3IgPSByb3cgPT4gXy5nZXQocm93LCBhY2Nlc3NvclN0cmluZylcbiAgICAgICAgICByZXR1cm4gZGNvbFxuICAgICAgICB9XG5cbiAgICAgICAgLy8gRmFsbCBiYWNrIHRvIGZ1bmN0aW9uYWwgYWNjZXNzb3IgKGJ1dCByZXF1aXJlIGFuIElEKVxuICAgICAgICBpZiAoZGNvbC5hY2Nlc3NvciAmJiAhZGNvbC5pZCkge1xuICAgICAgICAgIGNvbnNvbGUud2FybihkY29sKVxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAgICdBIGNvbHVtbiBpZCBpcyByZXF1aXJlZCBpZiB1c2luZyBhIG5vbi1zdHJpbmcgYWNjZXNzb3IgZm9yIGNvbHVtbiBhYm92ZS4nLFxuICAgICAgICAgIClcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEZhbGwgYmFjayB0byBhbiB1bmRlZmluZWQgYWNjZXNzb3JcbiAgICAgICAgaWYgKCFkY29sLmFjY2Vzc29yKSB7XG4gICAgICAgICAgZGNvbC5hY2Nlc3NvciA9ICgpID0+IHVuZGVmaW5lZFxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGRjb2xcbiAgICAgIH1cblxuICAgICAgY29uc3QgYWxsRGVjb3JhdGVkQ29sdW1ucyA9IFtdXG5cbiAgICAgIC8vIERlY29yYXRlIHRoZSBjb2x1bW5zXG4gICAgICBjb25zdCBkZWNvcmF0ZUFuZEFkZFRvQWxsID0gKGNvbHVtbiwgcGFyZW50Q29sdW1uKSA9PiB7XG4gICAgICAgIGNvbnN0IGRlY29yYXRlZENvbHVtbiA9IG1ha2VEZWNvcmF0ZWRDb2x1bW4oY29sdW1uLCBwYXJlbnRDb2x1bW4pXG4gICAgICAgIGFsbERlY29yYXRlZENvbHVtbnMucHVzaChkZWNvcmF0ZWRDb2x1bW4pXG4gICAgICAgIHJldHVybiBkZWNvcmF0ZWRDb2x1bW5cbiAgICAgIH1cblxuICAgICAgY29uc3QgZGVjb3JhdGVkQ29sdW1ucyA9IGNvbHVtbnNXaXRoRXhwYW5kZXIubWFwKGNvbHVtbiA9PiB7XG4gICAgICAgIGlmIChjb2x1bW4uY29sdW1ucykge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAuLi5jb2x1bW4sXG4gICAgICAgICAgICBjb2x1bW5zOiBjb2x1bW4uY29sdW1ucy5tYXAoZCA9PiBkZWNvcmF0ZUFuZEFkZFRvQWxsKGQsIGNvbHVtbikpLFxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZGVjb3JhdGVBbmRBZGRUb0FsbChjb2x1bW4pXG4gICAgICB9KVxuXG4gICAgICAvLyBCdWlsZCB0aGUgdmlzaWJsZSBjb2x1bW5zLCBoZWFkZXJzIGFuZCBmbGF0IGNvbHVtbiBsaXN0XG4gICAgICBsZXQgdmlzaWJsZUNvbHVtbnMgPSBkZWNvcmF0ZWRDb2x1bW5zLnNsaWNlKClcbiAgICAgIGxldCBhbGxWaXNpYmxlQ29sdW1ucyA9IFtdXG5cbiAgICAgIHZpc2libGVDb2x1bW5zID0gdmlzaWJsZUNvbHVtbnMubWFwKGNvbHVtbiA9PiB7XG4gICAgICAgIGlmIChjb2x1bW4uY29sdW1ucykge1xuICAgICAgICAgIGNvbnN0IHZpc2libGVTdWJDb2x1bW5zID0gY29sdW1uLmNvbHVtbnMuZmlsdGVyKGQgPT4gKFxuICAgICAgICAgICAgcGl2b3RCeS5pbmRleE9mKGQuaWQpID4gLTFcbiAgICAgICAgICAgICAgPyBmYWxzZVxuICAgICAgICAgICAgICA6IF8uZ2V0Rmlyc3REZWZpbmVkKGQuc2hvdywgdHJ1ZSlcbiAgICAgICAgICApKVxuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAuLi5jb2x1bW4sXG4gICAgICAgICAgICBjb2x1bW5zOiB2aXNpYmxlU3ViQ29sdW1ucyxcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNvbHVtblxuICAgICAgfSlcblxuICAgICAgdmlzaWJsZUNvbHVtbnMgPSB2aXNpYmxlQ29sdW1ucy5maWx0ZXIoY29sdW1uID0+IChcbiAgICAgICAgY29sdW1uLmNvbHVtbnNcbiAgICAgICAgICA/IGNvbHVtbi5jb2x1bW5zLmxlbmd0aFxuICAgICAgICAgIDogcGl2b3RCeS5pbmRleE9mKGNvbHVtbi5pZCkgPiAtMVxuICAgICAgICAgICAgPyBmYWxzZVxuICAgICAgICAgICAgOiBfLmdldEZpcnN0RGVmaW5lZChjb2x1bW4uc2hvdywgdHJ1ZSlcbiAgICAgICkpXG5cbiAgICAgIC8vIEZpbmQgYW55IGN1c3RvbSBwaXZvdCBsb2NhdGlvblxuICAgICAgY29uc3QgcGl2b3RJbmRleCA9IHZpc2libGVDb2x1bW5zLmZpbmRJbmRleChjb2wgPT4gY29sLnBpdm90KVxuXG4gICAgICAvLyBIYW5kbGUgUGl2b3QgQ29sdW1uc1xuICAgICAgaWYgKHBpdm90QnkubGVuZ3RoKSB7XG4gICAgICAgIC8vIFJldHJpZXZlIHRoZSBwaXZvdCBjb2x1bW5zIGluIHRoZSBjb3JyZWN0IHBpdm90IG9yZGVyXG4gICAgICAgIGNvbnN0IHBpdm90Q29sdW1ucyA9IFtdXG4gICAgICAgIHBpdm90QnkuZm9yRWFjaChwaXZvdElEID0+IHtcbiAgICAgICAgICBjb25zdCBmb3VuZCA9IGFsbERlY29yYXRlZENvbHVtbnMuZmluZChkID0+IGQuaWQgPT09IHBpdm90SUQpXG4gICAgICAgICAgaWYgKGZvdW5kKSB7XG4gICAgICAgICAgICBwaXZvdENvbHVtbnMucHVzaChmb3VuZClcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG5cbiAgICAgICAgY29uc3QgUGl2b3RQYXJlbnRDb2x1bW4gPSBwaXZvdENvbHVtbnMucmVkdWNlKFxuICAgICAgICAgIChwcmV2LCBjdXJyZW50KSA9PlxuICAgICAgICAgICAgcHJldiAmJiBwcmV2ID09PSBjdXJyZW50LnBhcmVudENvbHVtbiAmJiBjdXJyZW50LnBhcmVudENvbHVtbixcbiAgICAgICAgICBwaXZvdENvbHVtbnNbMF0ucGFyZW50Q29sdW1uLFxuICAgICAgICApXG5cbiAgICAgICAgbGV0IFBpdm90R3JvdXBIZWFkZXIgPSBoYXNIZWFkZXJHcm91cHMgJiYgUGl2b3RQYXJlbnRDb2x1bW4uSGVhZGVyXG4gICAgICAgIFBpdm90R3JvdXBIZWFkZXIgPSBQaXZvdEdyb3VwSGVhZGVyIHx8ICgoKSA9PiA8c3Ryb25nPlBpdm90ZWQ8L3N0cm9uZz4pXG5cbiAgICAgICAgbGV0IHBpdm90Q29sdW1uR3JvdXAgPSB7XG4gICAgICAgICAgSGVhZGVyOiBQaXZvdEdyb3VwSGVhZGVyLFxuICAgICAgICAgIGNvbHVtbnM6IHBpdm90Q29sdW1ucy5tYXAoY29sID0+ICh7XG4gICAgICAgICAgICAuLi50aGlzLnByb3BzLnBpdm90RGVmYXVsdHMsXG4gICAgICAgICAgICAuLi5jb2wsXG4gICAgICAgICAgICBwaXZvdGVkOiB0cnVlLFxuICAgICAgICAgIH0pKSxcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFBsYWNlIHRoZSBwaXZvdENvbHVtbnMgYmFjayBpbnRvIHRoZSB2aXNpYmxlQ29sdW1uc1xuICAgICAgICBpZiAocGl2b3RJbmRleCA+PSAwKSB7XG4gICAgICAgICAgcGl2b3RDb2x1bW5Hcm91cCA9IHtcbiAgICAgICAgICAgIC4uLnZpc2libGVDb2x1bW5zW3Bpdm90SW5kZXhdLFxuICAgICAgICAgICAgLi4ucGl2b3RDb2x1bW5Hcm91cCxcbiAgICAgICAgICB9XG4gICAgICAgICAgdmlzaWJsZUNvbHVtbnMuc3BsaWNlKHBpdm90SW5kZXgsIDEsIHBpdm90Q29sdW1uR3JvdXApXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdmlzaWJsZUNvbHVtbnMudW5zaGlmdChwaXZvdENvbHVtbkdyb3VwKVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIEJ1aWxkIEhlYWRlciBHcm91cHNcbiAgICAgIGNvbnN0IGhlYWRlckdyb3VwcyA9IFtdXG4gICAgICBsZXQgY3VycmVudFNwYW4gPSBbXVxuXG4gICAgICAvLyBBIGNvbnZlbmllbmNlIGZ1bmN0aW9uIHRvIGFkZCBhIGhlYWRlciBhbmQgcmVzZXQgdGhlIGN1cnJlbnRTcGFuXG4gICAgICBjb25zdCBhZGRIZWFkZXIgPSAoY29sdW1ucywgY29sdW1uKSA9PiB7XG4gICAgICAgIGhlYWRlckdyb3Vwcy5wdXNoKHtcbiAgICAgICAgICAuLi50aGlzLnByb3BzLmNvbHVtbixcbiAgICAgICAgICAuLi5jb2x1bW4sXG4gICAgICAgICAgY29sdW1ucyxcbiAgICAgICAgfSlcbiAgICAgICAgY3VycmVudFNwYW4gPSBbXVxuICAgICAgfVxuXG4gICAgICAvLyBCdWlsZCBmbGFzdCBsaXN0IG9mIGFsbFZpc2libGVDb2x1bW5zIGFuZCBIZWFkZXJHcm91cHNcbiAgICAgIHZpc2libGVDb2x1bW5zLmZvckVhY2goY29sdW1uID0+IHtcbiAgICAgICAgaWYgKGNvbHVtbi5jb2x1bW5zKSB7XG4gICAgICAgICAgYWxsVmlzaWJsZUNvbHVtbnMgPSBhbGxWaXNpYmxlQ29sdW1ucy5jb25jYXQoY29sdW1uLmNvbHVtbnMpXG4gICAgICAgICAgaWYgKGN1cnJlbnRTcGFuLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGFkZEhlYWRlcihjdXJyZW50U3BhbilcbiAgICAgICAgICB9XG4gICAgICAgICAgYWRkSGVhZGVyKGNvbHVtbi5jb2x1bW5zLCBjb2x1bW4pXG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgYWxsVmlzaWJsZUNvbHVtbnMucHVzaChjb2x1bW4pXG4gICAgICAgIGN1cnJlbnRTcGFuLnB1c2goY29sdW1uKVxuICAgICAgfSlcbiAgICAgIGlmIChoYXNIZWFkZXJHcm91cHMgJiYgY3VycmVudFNwYW4ubGVuZ3RoID4gMCkge1xuICAgICAgICBhZGRIZWFkZXIoY3VycmVudFNwYW4pXG4gICAgICB9XG5cbiAgICAgIC8vIEFjY2VzcyB0aGUgZGF0YVxuICAgICAgY29uc3QgYWNjZXNzUm93ID0gKGQsIGksIGxldmVsID0gMCkgPT4ge1xuICAgICAgICBjb25zdCByb3cgPSB7XG4gICAgICAgICAgW29yaWdpbmFsS2V5XTogZCxcbiAgICAgICAgICBbaW5kZXhLZXldOiBpLFxuICAgICAgICAgIFtzdWJSb3dzS2V5XTogZFtzdWJSb3dzS2V5XSxcbiAgICAgICAgICBbbmVzdGluZ0xldmVsS2V5XTogbGV2ZWwsXG4gICAgICAgIH1cbiAgICAgICAgYWxsRGVjb3JhdGVkQ29sdW1ucy5mb3JFYWNoKGNvbHVtbiA9PiB7XG4gICAgICAgICAgaWYgKGNvbHVtbi5leHBhbmRlcikgcmV0dXJuXG4gICAgICAgICAgcm93W2NvbHVtbi5pZF0gPSBjb2x1bW4uYWNjZXNzb3IoZClcbiAgICAgICAgfSlcbiAgICAgICAgaWYgKHJvd1tzdWJSb3dzS2V5XSkge1xuICAgICAgICAgIHJvd1tzdWJSb3dzS2V5XSA9IHJvd1tzdWJSb3dzS2V5XS5tYXAoKGQsIGkpID0+XG4gICAgICAgICAgICBhY2Nlc3NSb3coZCwgaSwgbGV2ZWwgKyAxKSxcbiAgICAgICAgICApXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJvd1xuICAgICAgfVxuICAgICAgbGV0IHJlc29sdmVkRGF0YSA9IGRhdGEubWFwKChkLCBpKSA9PiBhY2Nlc3NSb3coZCwgaSkpXG5cbiAgICAgIC8vIFRPRE86IE1ha2UgaXQgcG9zc2libGUgdG8gZmFicmljYXRlIG5lc3RlZCByb3dzIHdpdGhvdXQgcGl2b3RpbmdcbiAgICAgIGNvbnN0IGFnZ3JlZ2F0aW5nQ29sdW1ucyA9IGFsbFZpc2libGVDb2x1bW5zLmZpbHRlcihcbiAgICAgICAgZCA9PiAhZC5leHBhbmRlciAmJiBkLmFnZ3JlZ2F0ZSxcbiAgICAgIClcblxuICAgICAgLy8gSWYgcGl2b3RpbmcsIHJlY3Vyc2l2ZWx5IGdyb3VwIHRoZSBkYXRhXG4gICAgICBjb25zdCBhZ2dyZWdhdGUgPSByb3dzID0+IHtcbiAgICAgICAgY29uc3QgYWdncmVnYXRpb25WYWx1ZXMgPSB7fVxuICAgICAgICBhZ2dyZWdhdGluZ0NvbHVtbnMuZm9yRWFjaChjb2x1bW4gPT4ge1xuICAgICAgICAgIGNvbnN0IHZhbHVlcyA9IHJvd3MubWFwKGQgPT4gZFtjb2x1bW4uaWRdKVxuICAgICAgICAgIGFnZ3JlZ2F0aW9uVmFsdWVzW2NvbHVtbi5pZF0gPSBjb2x1bW4uYWdncmVnYXRlKHZhbHVlcywgcm93cylcbiAgICAgICAgfSlcbiAgICAgICAgcmV0dXJuIGFnZ3JlZ2F0aW9uVmFsdWVzXG4gICAgICB9XG4gICAgICBpZiAocGl2b3RCeS5sZW5ndGgpIHtcbiAgICAgICAgY29uc3QgZ3JvdXBSZWN1cnNpdmVseSA9IChyb3dzLCBrZXlzLCBpID0gMCkgPT4ge1xuICAgICAgICAgIC8vIFRoaXMgaXMgdGhlIGxhc3QgbGV2ZWwsIGp1c3QgcmV0dXJuIHRoZSByb3dzXG4gICAgICAgICAgaWYgKGkgPT09IGtleXMubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gcm93c1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBHcm91cCB0aGUgcm93cyB0b2dldGhlciBmb3IgdGhpcyBsZXZlbFxuICAgICAgICAgIGxldCBncm91cGVkUm93cyA9IE9iamVjdC5lbnRyaWVzKFxuICAgICAgICAgICAgXy5ncm91cEJ5KHJvd3MsIGtleXNbaV0pLFxuICAgICAgICAgICkubWFwKChba2V5LCB2YWx1ZV0pID0+ICh7XG4gICAgICAgICAgICBbcGl2b3RJREtleV06IGtleXNbaV0sXG4gICAgICAgICAgICBbcGl2b3RWYWxLZXldOiBrZXksXG4gICAgICAgICAgICBba2V5c1tpXV06IGtleSxcbiAgICAgICAgICAgIFtzdWJSb3dzS2V5XTogdmFsdWUsXG4gICAgICAgICAgICBbbmVzdGluZ0xldmVsS2V5XTogaSxcbiAgICAgICAgICAgIFtncm91cGVkQnlQaXZvdEtleV06IHRydWUsXG4gICAgICAgICAgfSkpXG4gICAgICAgICAgLy8gUmVjdXJzZSBpbnRvIHRoZSBzdWJSb3dzXG4gICAgICAgICAgZ3JvdXBlZFJvd3MgPSBncm91cGVkUm93cy5tYXAocm93R3JvdXAgPT4ge1xuICAgICAgICAgICAgY29uc3Qgc3ViUm93cyA9IGdyb3VwUmVjdXJzaXZlbHkocm93R3JvdXBbc3ViUm93c0tleV0sIGtleXMsIGkgKyAxKVxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgLi4ucm93R3JvdXAsXG4gICAgICAgICAgICAgIFtzdWJSb3dzS2V5XTogc3ViUm93cyxcbiAgICAgICAgICAgICAgW2FnZ3JlZ2F0ZWRLZXldOiB0cnVlLFxuICAgICAgICAgICAgICAuLi5hZ2dyZWdhdGUoc3ViUm93cyksXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgICByZXR1cm4gZ3JvdXBlZFJvd3NcbiAgICAgICAgfVxuICAgICAgICByZXNvbHZlZERhdGEgPSBncm91cFJlY3Vyc2l2ZWx5KHJlc29sdmVkRGF0YSwgcGl2b3RCeSlcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4ubmV3U3RhdGUsXG4gICAgICAgIHJlc29sdmVkRGF0YSxcbiAgICAgICAgYWxsVmlzaWJsZUNvbHVtbnMsXG4gICAgICAgIGhlYWRlckdyb3VwcyxcbiAgICAgICAgYWxsRGVjb3JhdGVkQ29sdW1ucyxcbiAgICAgICAgaGFzSGVhZGVyR3JvdXBzLFxuICAgICAgfVxuICAgIH1cblxuICAgIGdldFNvcnRlZERhdGEgKHJlc29sdmVkU3RhdGUpIHtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgbWFudWFsLFxuICAgICAgICBzb3J0ZWQsXG4gICAgICAgIGZpbHRlcmVkLFxuICAgICAgICBkZWZhdWx0RmlsdGVyTWV0aG9kLFxuICAgICAgICByZXNvbHZlZERhdGEsXG4gICAgICAgIGFsbFZpc2libGVDb2x1bW5zLFxuICAgICAgICBhbGxEZWNvcmF0ZWRDb2x1bW5zLFxuICAgICAgfSA9IHJlc29sdmVkU3RhdGVcblxuICAgICAgY29uc3Qgc29ydE1ldGhvZHNCeUNvbHVtbklEID0ge31cblxuICAgICAgYWxsRGVjb3JhdGVkQ29sdW1ucy5maWx0ZXIoY29sID0+IGNvbC5zb3J0TWV0aG9kKS5mb3JFYWNoKGNvbCA9PiB7XG4gICAgICAgIHNvcnRNZXRob2RzQnlDb2x1bW5JRFtjb2wuaWRdID0gY29sLnNvcnRNZXRob2RcbiAgICAgIH0pXG5cbiAgICAgIC8vIFJlc29sdmUgdGhlIGRhdGEgZnJvbSBlaXRoZXIgbWFudWFsIGRhdGEgb3Igc29ydGVkIGRhdGFcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHNvcnRlZERhdGE6IG1hbnVhbFxuICAgICAgICAgID8gcmVzb2x2ZWREYXRhXG4gICAgICAgICAgOiB0aGlzLnNvcnREYXRhKFxuICAgICAgICAgICAgdGhpcy5maWx0ZXJEYXRhKFxuICAgICAgICAgICAgICByZXNvbHZlZERhdGEsXG4gICAgICAgICAgICAgIGZpbHRlcmVkLFxuICAgICAgICAgICAgICBkZWZhdWx0RmlsdGVyTWV0aG9kLFxuICAgICAgICAgICAgICBhbGxWaXNpYmxlQ29sdW1ucyxcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICBzb3J0ZWQsXG4gICAgICAgICAgICBzb3J0TWV0aG9kc0J5Q29sdW1uSUQsXG4gICAgICAgICAgKSxcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmaXJlRmV0Y2hEYXRhICgpIHtcbiAgICAgIHRoaXMucHJvcHMub25GZXRjaERhdGEodGhpcy5nZXRSZXNvbHZlZFN0YXRlKCksIHRoaXMpXG4gICAgfVxuXG4gICAgZ2V0UHJvcE9yU3RhdGUgKGtleSkge1xuICAgICAgcmV0dXJuIF8uZ2V0Rmlyc3REZWZpbmVkKHRoaXMucHJvcHNba2V5XSwgdGhpcy5zdGF0ZVtrZXldKVxuICAgIH1cblxuICAgIGdldFN0YXRlT3JQcm9wIChrZXkpIHtcbiAgICAgIHJldHVybiBfLmdldEZpcnN0RGVmaW5lZCh0aGlzLnN0YXRlW2tleV0sIHRoaXMucHJvcHNba2V5XSlcbiAgICB9XG5cbiAgICBmaWx0ZXJEYXRhIChkYXRhLCBmaWx0ZXJlZCwgZGVmYXVsdEZpbHRlck1ldGhvZCwgYWxsVmlzaWJsZUNvbHVtbnMpIHtcbiAgICAgIGxldCBmaWx0ZXJlZERhdGEgPSBkYXRhXG5cbiAgICAgIGlmIChmaWx0ZXJlZC5sZW5ndGgpIHtcbiAgICAgICAgZmlsdGVyZWREYXRhID0gZmlsdGVyZWQucmVkdWNlKChmaWx0ZXJlZFNvRmFyLCBuZXh0RmlsdGVyKSA9PiB7XG4gICAgICAgICAgY29uc3QgY29sdW1uID0gYWxsVmlzaWJsZUNvbHVtbnMuZmluZCh4ID0+IHguaWQgPT09IG5leHRGaWx0ZXIuaWQpXG5cbiAgICAgICAgICAvLyBEb24ndCBmaWx0ZXIgaGlkZGVuIGNvbHVtbnMgb3IgY29sdW1ucyB0aGF0IGhhdmUgaGFkIHRoZWlyIGZpbHRlcnMgZGlzYWJsZWRcbiAgICAgICAgICBpZiAoIWNvbHVtbiB8fCBjb2x1bW4uZmlsdGVyYWJsZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHJldHVybiBmaWx0ZXJlZFNvRmFyXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3QgZmlsdGVyTWV0aG9kID0gY29sdW1uLmZpbHRlck1ldGhvZCB8fCBkZWZhdWx0RmlsdGVyTWV0aG9kXG5cbiAgICAgICAgICAvLyBJZiAnZmlsdGVyQWxsJyBpcyBzZXQgdG8gdHJ1ZSwgcGFzcyB0aGUgZW50aXJlIGRhdGFzZXQgdG8gdGhlIGZpbHRlciBtZXRob2RcbiAgICAgICAgICBpZiAoY29sdW1uLmZpbHRlckFsbCkge1xuICAgICAgICAgICAgcmV0dXJuIGZpbHRlck1ldGhvZChuZXh0RmlsdGVyLCBmaWx0ZXJlZFNvRmFyLCBjb2x1bW4pXG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBmaWx0ZXJlZFNvRmFyLmZpbHRlcihyb3cgPT4gKFxuICAgICAgICAgICAgZmlsdGVyTWV0aG9kKG5leHRGaWx0ZXIsIHJvdywgY29sdW1uKVxuICAgICAgICAgICkpXG4gICAgICAgIH0sIGZpbHRlcmVkRGF0YSlcblxuICAgICAgICAvLyBBcHBseSB0aGUgZmlsdGVyIHRvIHRoZSBzdWJyb3dzIGlmIHdlIGFyZSBwaXZvdGluZywgYW5kIHRoZW5cbiAgICAgICAgLy8gZmlsdGVyIGFueSByb3dzIHdpdGhvdXQgc3ViY29sdW1ucyBiZWNhdXNlIGl0IHdvdWxkIGJlIHN0cmFuZ2UgdG8gc2hvd1xuICAgICAgICBmaWx0ZXJlZERhdGEgPSBmaWx0ZXJlZERhdGFcbiAgICAgICAgICAubWFwKHJvdyA9PiB7XG4gICAgICAgICAgICBpZiAoIXJvd1t0aGlzLnByb3BzLnN1YlJvd3NLZXldKSB7XG4gICAgICAgICAgICAgIHJldHVybiByb3dcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIC4uLnJvdyxcbiAgICAgICAgICAgICAgW3RoaXMucHJvcHMuc3ViUm93c0tleV06IHRoaXMuZmlsdGVyRGF0YShcbiAgICAgICAgICAgICAgICByb3dbdGhpcy5wcm9wcy5zdWJSb3dzS2V5XSxcbiAgICAgICAgICAgICAgICBmaWx0ZXJlZCxcbiAgICAgICAgICAgICAgICBkZWZhdWx0RmlsdGVyTWV0aG9kLFxuICAgICAgICAgICAgICAgIGFsbFZpc2libGVDb2x1bW5zLFxuICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgICAgLmZpbHRlcihyb3cgPT4ge1xuICAgICAgICAgICAgaWYgKCFyb3dbdGhpcy5wcm9wcy5zdWJSb3dzS2V5XSkge1xuICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJvd1t0aGlzLnByb3BzLnN1YlJvd3NLZXldLmxlbmd0aCA+IDBcbiAgICAgICAgICB9KVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gZmlsdGVyZWREYXRhXG4gICAgfVxuXG4gICAgc29ydERhdGEgKGRhdGEsIHNvcnRlZCwgc29ydE1ldGhvZHNCeUNvbHVtbklEID0ge30pIHtcbiAgICAgIGlmICghc29ydGVkLmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gZGF0YVxuICAgICAgfVxuXG4gICAgICBjb25zdCBzb3J0ZWREYXRhID0gKHRoaXMucHJvcHMub3JkZXJCeU1ldGhvZCB8fCBfLm9yZGVyQnkpKFxuICAgICAgICBkYXRhLFxuICAgICAgICBzb3J0ZWQubWFwKHNvcnQgPT4ge1xuICAgICAgICAgIC8vIFN1cHBvcnQgY3VzdG9tIHNvcnRpbmcgbWV0aG9kcyBmb3IgZWFjaCBjb2x1bW5cbiAgICAgICAgICBpZiAoc29ydE1ldGhvZHNCeUNvbHVtbklEW3NvcnQuaWRdKSB7XG4gICAgICAgICAgICByZXR1cm4gKGEsIGIpID0+IChcbiAgICAgICAgICAgICAgc29ydE1ldGhvZHNCeUNvbHVtbklEW3NvcnQuaWRdKGFbc29ydC5pZF0sIGJbc29ydC5pZF0sIHNvcnQuZGVzYylcbiAgICAgICAgICAgIClcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIChhLCBiKSA9PiAoXG4gICAgICAgICAgICB0aGlzLnByb3BzLmRlZmF1bHRTb3J0TWV0aG9kKGFbc29ydC5pZF0sIGJbc29ydC5pZF0sIHNvcnQuZGVzYylcbiAgICAgICAgICApXG4gICAgICAgIH0pLFxuICAgICAgICBzb3J0ZWQubWFwKGQgPT4gIWQuZGVzYyksXG4gICAgICAgIHRoaXMucHJvcHMuaW5kZXhLZXksXG4gICAgICApXG5cbiAgICAgIHNvcnRlZERhdGEuZm9yRWFjaChyb3cgPT4ge1xuICAgICAgICBpZiAoIXJvd1t0aGlzLnByb3BzLnN1YlJvd3NLZXldKSB7XG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgcm93W3RoaXMucHJvcHMuc3ViUm93c0tleV0gPSB0aGlzLnNvcnREYXRhKFxuICAgICAgICAgIHJvd1t0aGlzLnByb3BzLnN1YlJvd3NLZXldLFxuICAgICAgICAgIHNvcnRlZCxcbiAgICAgICAgICBzb3J0TWV0aG9kc0J5Q29sdW1uSUQsXG4gICAgICAgIClcbiAgICAgIH0pXG5cbiAgICAgIHJldHVybiBzb3J0ZWREYXRhXG4gICAgfVxuXG4gICAgZ2V0TWluUm93cyAoKSB7XG4gICAgICByZXR1cm4gXy5nZXRGaXJzdERlZmluZWQoXG4gICAgICAgIHRoaXMucHJvcHMubWluUm93cyxcbiAgICAgICAgdGhpcy5nZXRTdGF0ZU9yUHJvcCgncGFnZVNpemUnKSxcbiAgICAgIClcbiAgICB9XG5cbiAgICAvLyBVc2VyIGFjdGlvbnNcbiAgICBvblBhZ2VDaGFuZ2UgKHBhZ2UpIHtcbiAgICAgIGNvbnN0IHsgb25QYWdlQ2hhbmdlLCBjb2xsYXBzZU9uUGFnZUNoYW5nZSB9ID0gdGhpcy5wcm9wc1xuXG4gICAgICBjb25zdCBuZXdTdGF0ZSA9IHsgcGFnZSB9XG4gICAgICBpZiAoY29sbGFwc2VPblBhZ2VDaGFuZ2UpIHtcbiAgICAgICAgbmV3U3RhdGUuZXhwYW5kZWQgPSB7fVxuICAgICAgfVxuICAgICAgdGhpcy5zZXRTdGF0ZVdpdGhEYXRhKG5ld1N0YXRlLCAoKSA9PiAoXG4gICAgICAgIG9uUGFnZUNoYW5nZSAmJiBvblBhZ2VDaGFuZ2UocGFnZSlcbiAgICAgICkpXG4gICAgfVxuXG4gICAgb25QYWdlU2l6ZUNoYW5nZSAobmV3UGFnZVNpemUpIHtcbiAgICAgIGNvbnN0IHsgb25QYWdlU2l6ZUNoYW5nZSB9ID0gdGhpcy5wcm9wc1xuICAgICAgY29uc3QgeyBwYWdlU2l6ZSwgcGFnZSB9ID0gdGhpcy5nZXRSZXNvbHZlZFN0YXRlKClcblxuICAgICAgLy8gTm9ybWFsaXplIHRoZSBwYWdlIHRvIGRpc3BsYXlcbiAgICAgIGNvbnN0IGN1cnJlbnRSb3cgPSBwYWdlU2l6ZSAqIHBhZ2VcbiAgICAgIGNvbnN0IG5ld1BhZ2UgPSBNYXRoLmZsb29yKGN1cnJlbnRSb3cgLyBuZXdQYWdlU2l6ZSlcblxuICAgICAgdGhpcy5zZXRTdGF0ZVdpdGhEYXRhKFxuICAgICAgICB7XG4gICAgICAgICAgcGFnZVNpemU6IG5ld1BhZ2VTaXplLFxuICAgICAgICAgIHBhZ2U6IG5ld1BhZ2UsXG4gICAgICAgIH0sXG4gICAgICAgICgpID0+IChcbiAgICAgICAgICBvblBhZ2VTaXplQ2hhbmdlICYmIG9uUGFnZVNpemVDaGFuZ2UobmV3UGFnZVNpemUsIG5ld1BhZ2UpXG4gICAgICAgICksXG4gICAgICApXG4gICAgfVxuXG4gICAgc29ydENvbHVtbiAoY29sdW1uLCBhZGRpdGl2ZSkge1xuICAgICAgY29uc3QgeyBzb3J0ZWQsIHNraXBOZXh0U29ydCwgZGVmYXVsdFNvcnREZXNjIH0gPSB0aGlzLmdldFJlc29sdmVkU3RhdGUoKVxuXG4gICAgICBjb25zdCBmaXJzdFNvcnREaXJlY3Rpb24gPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoY29sdW1uLCAnZGVmYXVsdFNvcnREZXNjJylcbiAgICAgICAgPyBjb2x1bW4uZGVmYXVsdFNvcnREZXNjXG4gICAgICAgIDogZGVmYXVsdFNvcnREZXNjXG4gICAgICBjb25zdCBzZWNvbmRTb3J0RGlyZWN0aW9uID0gIWZpcnN0U29ydERpcmVjdGlvblxuXG4gICAgICAvLyB3ZSBjYW4ndCBzdG9wIGV2ZW50IHByb3BhZ2F0aW9uIGZyb20gdGhlIGNvbHVtbiByZXNpemUgbW92ZSBoYW5kbGVyc1xuICAgICAgLy8gYXR0YWNoZWQgdG8gdGhlIGRvY3VtZW50IGJlY2F1c2Ugb2YgcmVhY3QncyBzeW50aGV0aWMgZXZlbnRzXG4gICAgICAvLyBzbyB3ZSBoYXZlIHRvIHByZXZlbnQgdGhlIHNvcnQgZnVuY3Rpb24gZnJvbSBhY3R1YWxseSBzb3J0aW5nXG4gICAgICAvLyBpZiB3ZSBjbGljayBvbiB0aGUgY29sdW1uIHJlc2l6ZSBlbGVtZW50IHdpdGhpbiBhIGhlYWRlci5cbiAgICAgIGlmIChza2lwTmV4dFNvcnQpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZVdpdGhEYXRhKHtcbiAgICAgICAgICBza2lwTmV4dFNvcnQ6IGZhbHNlLFxuICAgICAgICB9KVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgY29uc3QgeyBvblNvcnRlZENoYW5nZSB9ID0gdGhpcy5wcm9wc1xuXG4gICAgICBsZXQgbmV3U29ydGVkID0gXy5jbG9uZShzb3J0ZWQgfHwgW10pLm1hcChkID0+IHtcbiAgICAgICAgZC5kZXNjID0gXy5pc1NvcnRpbmdEZXNjKGQpXG4gICAgICAgIHJldHVybiBkXG4gICAgICB9KVxuICAgICAgaWYgKCFfLmlzQXJyYXkoY29sdW1uKSkge1xuICAgICAgICAvLyBTaW5nbGUtU29ydFxuICAgICAgICBjb25zdCBleGlzdGluZ0luZGV4ID0gbmV3U29ydGVkLmZpbmRJbmRleChkID0+IGQuaWQgPT09IGNvbHVtbi5pZClcbiAgICAgICAgaWYgKGV4aXN0aW5nSW5kZXggPiAtMSkge1xuICAgICAgICAgIGNvbnN0IGV4aXN0aW5nID0gbmV3U29ydGVkW2V4aXN0aW5nSW5kZXhdXG4gICAgICAgICAgaWYgKGV4aXN0aW5nLmRlc2MgPT09IHNlY29uZFNvcnREaXJlY3Rpb24pIHtcbiAgICAgICAgICAgIGlmIChhZGRpdGl2ZSkge1xuICAgICAgICAgICAgICBuZXdTb3J0ZWQuc3BsaWNlKGV4aXN0aW5nSW5kZXgsIDEpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBleGlzdGluZy5kZXNjID0gZmlyc3RTb3J0RGlyZWN0aW9uXG4gICAgICAgICAgICAgIG5ld1NvcnRlZCA9IFtleGlzdGluZ11cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZXhpc3RpbmcuZGVzYyA9IHNlY29uZFNvcnREaXJlY3Rpb25cbiAgICAgICAgICAgIGlmICghYWRkaXRpdmUpIHtcbiAgICAgICAgICAgICAgbmV3U29ydGVkID0gW2V4aXN0aW5nXVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChhZGRpdGl2ZSkge1xuICAgICAgICAgIG5ld1NvcnRlZC5wdXNoKHtcbiAgICAgICAgICAgIGlkOiBjb2x1bW4uaWQsXG4gICAgICAgICAgICBkZXNjOiBmaXJzdFNvcnREaXJlY3Rpb24sXG4gICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBuZXdTb3J0ZWQgPSBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGlkOiBjb2x1bW4uaWQsXG4gICAgICAgICAgICAgIGRlc2M6IGZpcnN0U29ydERpcmVjdGlvbixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgXVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBNdWx0aS1Tb3J0XG4gICAgICAgIGNvbnN0IGV4aXN0aW5nSW5kZXggPSBuZXdTb3J0ZWQuZmluZEluZGV4KGQgPT4gZC5pZCA9PT0gY29sdW1uWzBdLmlkKVxuICAgICAgICAvLyBFeGlzdGluZyBTb3J0ZWQgQ29sdW1uXG4gICAgICAgIGlmIChleGlzdGluZ0luZGV4ID4gLTEpIHtcbiAgICAgICAgICBjb25zdCBleGlzdGluZyA9IG5ld1NvcnRlZFtleGlzdGluZ0luZGV4XVxuICAgICAgICAgIGlmIChleGlzdGluZy5kZXNjID09PSBzZWNvbmRTb3J0RGlyZWN0aW9uKSB7XG4gICAgICAgICAgICBpZiAoYWRkaXRpdmUpIHtcbiAgICAgICAgICAgICAgbmV3U29ydGVkLnNwbGljZShleGlzdGluZ0luZGV4LCBjb2x1bW4ubGVuZ3RoKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgY29sdW1uLmZvckVhY2goKGQsIGkpID0+IHtcbiAgICAgICAgICAgICAgICBuZXdTb3J0ZWRbZXhpc3RpbmdJbmRleCArIGldLmRlc2MgPSBmaXJzdFNvcnREaXJlY3Rpb25cbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29sdW1uLmZvckVhY2goKGQsIGkpID0+IHtcbiAgICAgICAgICAgICAgbmV3U29ydGVkW2V4aXN0aW5nSW5kZXggKyBpXS5kZXNjID0gc2Vjb25kU29ydERpcmVjdGlvblxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKCFhZGRpdGl2ZSkge1xuICAgICAgICAgICAgbmV3U29ydGVkID0gbmV3U29ydGVkLnNsaWNlKGV4aXN0aW5nSW5kZXgsIGNvbHVtbi5sZW5ndGgpXG4gICAgICAgICAgfVxuICAgICAgICAvLyBOZXcgU29ydCBDb2x1bW5cbiAgICAgICAgfSBlbHNlIGlmIChhZGRpdGl2ZSkge1xuICAgICAgICAgIG5ld1NvcnRlZCA9IG5ld1NvcnRlZC5jb25jYXQoXG4gICAgICAgICAgICBjb2x1bW4ubWFwKGQgPT4gKHtcbiAgICAgICAgICAgICAgaWQ6IGQuaWQsXG4gICAgICAgICAgICAgIGRlc2M6IGZpcnN0U29ydERpcmVjdGlvbixcbiAgICAgICAgICAgIH0pKSxcbiAgICAgICAgICApXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbmV3U29ydGVkID0gY29sdW1uLm1hcChkID0+ICh7XG4gICAgICAgICAgICBpZDogZC5pZCxcbiAgICAgICAgICAgIGRlc2M6IGZpcnN0U29ydERpcmVjdGlvbixcbiAgICAgICAgICB9KSlcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB0aGlzLnNldFN0YXRlV2l0aERhdGEoXG4gICAgICAgIHtcbiAgICAgICAgICBwYWdlOlxuICAgICAgICAgICAgKCFzb3J0ZWQubGVuZ3RoICYmIG5ld1NvcnRlZC5sZW5ndGgpIHx8ICFhZGRpdGl2ZVxuICAgICAgICAgICAgICA/IDBcbiAgICAgICAgICAgICAgOiB0aGlzLnN0YXRlLnBhZ2UsXG4gICAgICAgICAgc29ydGVkOiBuZXdTb3J0ZWQsXG4gICAgICAgIH0sXG4gICAgICAgICgpID0+IChcbiAgICAgICAgICBvblNvcnRlZENoYW5nZSAmJiBvblNvcnRlZENoYW5nZShuZXdTb3J0ZWQsIGNvbHVtbiwgYWRkaXRpdmUpXG4gICAgICAgICksXG4gICAgICApXG4gICAgfVxuXG4gICAgZmlsdGVyQ29sdW1uIChjb2x1bW4sIHZhbHVlKSB7XG4gICAgICBjb25zdCB7IGZpbHRlcmVkIH0gPSB0aGlzLmdldFJlc29sdmVkU3RhdGUoKVxuICAgICAgY29uc3QgeyBvbkZpbHRlcmVkQ2hhbmdlIH0gPSB0aGlzLnByb3BzXG5cbiAgICAgIC8vIFJlbW92ZSBvbGQgZmlsdGVyIGZpcnN0IGlmIGl0IGV4aXN0c1xuICAgICAgY29uc3QgbmV3RmlsdGVyaW5nID0gKGZpbHRlcmVkIHx8IFtdKS5maWx0ZXIoeCA9PiAoXG4gICAgICAgIHguaWQgIT09IGNvbHVtbi5pZFxuICAgICAgKSlcblxuICAgICAgaWYgKHZhbHVlICE9PSAnJykge1xuICAgICAgICBuZXdGaWx0ZXJpbmcucHVzaCh7XG4gICAgICAgICAgaWQ6IGNvbHVtbi5pZCxcbiAgICAgICAgICB2YWx1ZSxcbiAgICAgICAgfSlcbiAgICAgIH1cblxuICAgICAgdGhpcy5zZXRTdGF0ZVdpdGhEYXRhKFxuICAgICAgICB7XG4gICAgICAgICAgZmlsdGVyZWQ6IG5ld0ZpbHRlcmluZyxcbiAgICAgICAgfSxcbiAgICAgICAgKCkgPT4gKFxuICAgICAgICAgIG9uRmlsdGVyZWRDaGFuZ2UgJiYgb25GaWx0ZXJlZENoYW5nZShuZXdGaWx0ZXJpbmcsIGNvbHVtbiwgdmFsdWUpXG4gICAgICAgICksXG4gICAgICApXG4gICAgfVxuXG4gICAgcmVzaXplQ29sdW1uU3RhcnQgKGV2ZW50LCBjb2x1bW4sIGlzVG91Y2gpIHtcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXG4gICAgICBjb25zdCBwYXJlbnRXaWR0aCA9IGV2ZW50LnRhcmdldC5wYXJlbnRFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG4gICAgICAgIC53aWR0aFxuXG4gICAgICBsZXQgcGFnZVhcbiAgICAgIGlmIChpc1RvdWNoKSB7XG4gICAgICAgIHBhZ2VYID0gZXZlbnQuY2hhbmdlZFRvdWNoZXNbMF0ucGFnZVhcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBhZ2VYID0gZXZlbnQucGFnZVhcbiAgICAgIH1cblxuICAgICAgdGhpcy50cmFwRXZlbnRzID0gdHJ1ZVxuICAgICAgdGhpcy5zZXRTdGF0ZVdpdGhEYXRhKFxuICAgICAgICB7XG4gICAgICAgICAgY3VycmVudGx5UmVzaXppbmc6IHtcbiAgICAgICAgICAgIGlkOiBjb2x1bW4uaWQsXG4gICAgICAgICAgICBzdGFydFg6IHBhZ2VYLFxuICAgICAgICAgICAgcGFyZW50V2lkdGgsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAgKCkgPT4ge1xuICAgICAgICAgIGlmIChpc1RvdWNoKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCB0aGlzLnJlc2l6ZUNvbHVtbk1vdmluZylcbiAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoY2FuY2VsJywgdGhpcy5yZXNpemVDb2x1bW5FbmQpXG4gICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHRoaXMucmVzaXplQ29sdW1uRW5kKVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLnJlc2l6ZUNvbHVtbk1vdmluZylcbiAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLnJlc2l6ZUNvbHVtbkVuZClcbiAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCB0aGlzLnJlc2l6ZUNvbHVtbkVuZClcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICApXG4gICAgfVxuXG4gICAgcmVzaXplQ29sdW1uTW92aW5nIChldmVudCkge1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcbiAgICAgIGNvbnN0IHsgb25SZXNpemVkQ2hhbmdlIH0gPSB0aGlzLnByb3BzXG4gICAgICBjb25zdCB7IHJlc2l6ZWQsIGN1cnJlbnRseVJlc2l6aW5nIH0gPSB0aGlzLmdldFJlc29sdmVkU3RhdGUoKVxuXG4gICAgICAvLyBEZWxldGUgb2xkIHZhbHVlXG4gICAgICBjb25zdCBuZXdSZXNpemVkID0gcmVzaXplZC5maWx0ZXIoeCA9PiB4LmlkICE9PSBjdXJyZW50bHlSZXNpemluZy5pZClcblxuICAgICAgbGV0IHBhZ2VYXG5cbiAgICAgIGlmIChldmVudC50eXBlID09PSAndG91Y2htb3ZlJykge1xuICAgICAgICBwYWdlWCA9IGV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdLnBhZ2VYXG4gICAgICB9IGVsc2UgaWYgKGV2ZW50LnR5cGUgPT09ICdtb3VzZW1vdmUnKSB7XG4gICAgICAgIHBhZ2VYID0gZXZlbnQucGFnZVhcbiAgICAgIH1cblxuICAgICAgLy8gU2V0IHRoZSBtaW4gc2l6ZSB0byAxMCB0byBhY2NvdW50IGZvciBtYXJnaW4gYW5kIGJvcmRlciBvciBlbHNlIHRoZVxuICAgICAgLy8gZ3JvdXAgaGVhZGVycyBkb24ndCBsaW5lIHVwIGNvcnJlY3RseVxuICAgICAgY29uc3QgbmV3V2lkdGggPSBNYXRoLm1heChcbiAgICAgICAgY3VycmVudGx5UmVzaXppbmcucGFyZW50V2lkdGggKyBwYWdlWCAtIGN1cnJlbnRseVJlc2l6aW5nLnN0YXJ0WCxcbiAgICAgICAgMTEsXG4gICAgICApXG5cbiAgICAgIG5ld1Jlc2l6ZWQucHVzaCh7XG4gICAgICAgIGlkOiBjdXJyZW50bHlSZXNpemluZy5pZCxcbiAgICAgICAgdmFsdWU6IG5ld1dpZHRoLFxuICAgICAgfSlcblxuICAgICAgdGhpcy5zZXRTdGF0ZVdpdGhEYXRhKFxuICAgICAgICB7XG4gICAgICAgICAgcmVzaXplZDogbmV3UmVzaXplZCxcbiAgICAgICAgfSxcbiAgICAgICAgKCkgPT4gKFxuICAgICAgICAgIG9uUmVzaXplZENoYW5nZSAmJiBvblJlc2l6ZWRDaGFuZ2UobmV3UmVzaXplZCwgZXZlbnQpXG4gICAgICAgICksXG4gICAgICApXG4gICAgfVxuXG4gICAgcmVzaXplQ29sdW1uRW5kIChldmVudCkge1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcbiAgICAgIGNvbnN0IGlzVG91Y2ggPSBldmVudC50eXBlID09PSAndG91Y2hlbmQnIHx8IGV2ZW50LnR5cGUgPT09ICd0b3VjaGNhbmNlbCdcblxuICAgICAgaWYgKGlzVG91Y2gpIHtcbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdGhpcy5yZXNpemVDb2x1bW5Nb3ZpbmcpXG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoY2FuY2VsJywgdGhpcy5yZXNpemVDb2x1bW5FbmQpXG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgdGhpcy5yZXNpemVDb2x1bW5FbmQpXG4gICAgICB9XG5cbiAgICAgIC8vIElmIGl0cyBhIHRvdWNoIGV2ZW50IGNsZWFyIHRoZSBtb3VzZSBvbmUncyBhcyB3ZWxsIGJlY2F1c2Ugc29tZXRpbWVzXG4gICAgICAvLyB0aGUgbW91c2VEb3duIGV2ZW50IGdldHMgY2FsbGVkIGFzIHdlbGwsIGJ1dCB0aGUgbW91c2VVcCBldmVudCBkb2Vzbid0XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLnJlc2l6ZUNvbHVtbk1vdmluZylcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLnJlc2l6ZUNvbHVtbkVuZClcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCB0aGlzLnJlc2l6ZUNvbHVtbkVuZClcblxuICAgICAgLy8gVGhlIHRvdWNoIGV2ZW50cyBkb24ndCBwcm9wYWdhdGUgdXAgdG8gdGhlIHNvcnRpbmcncyBvbk1vdXNlRG93biBldmVudCBzb1xuICAgICAgLy8gbm8gbmVlZCB0byBwcmV2ZW50IGl0IGZyb20gaGFwcGVuaW5nIG9yIGVsc2UgdGhlIGZpcnN0IGNsaWNrIGFmdGVyIGEgdG91Y2hcbiAgICAgIC8vIGV2ZW50IHJlc2l6ZSB3aWxsIG5vdCBzb3J0IHRoZSBjb2x1bW4uXG4gICAgICBpZiAoIWlzVG91Y2gpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZVdpdGhEYXRhKHtcbiAgICAgICAgICBza2lwTmV4dFNvcnQ6IHRydWUsXG4gICAgICAgICAgY3VycmVudGx5UmVzaXppbmc6IGZhbHNlLFxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH1cbiAgfVxuIl19