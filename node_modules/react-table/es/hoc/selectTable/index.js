var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* eslint-disable */

import React from 'react';

var defaultSelectInputComponent = function defaultSelectInputComponent(props) {
  return React.createElement('input', {
    type: props.selectType || 'checkbox',
    checked: props.checked,
    onClick: function onClick(e) {
      var shiftKey = e.shiftKey;

      e.stopPropagation();
      props.onClick(props.id, shiftKey, props.row);
    },
    onChange: function onChange() {}
  });
};

export default (function (Component) {

  var wrapper = function (_React$Component) {
    _inherits(RTSelectTable, _React$Component);

    function RTSelectTable(props) {
      _classCallCheck(this, RTSelectTable);

      return _possibleConstructorReturn(this, (RTSelectTable.__proto__ || Object.getPrototypeOf(RTSelectTable)).call(this, props));
    }

    _createClass(RTSelectTable, [{
      key: 'rowSelector',
      value: function rowSelector(row) {
        if (!row || !row.hasOwnProperty(this.props.keyField)) return null;
        var _props = this.props,
            toggleSelection = _props.toggleSelection,
            selectType = _props.selectType,
            keyField = _props.keyField;

        var checked = this.props.isSelected(row[this.props.keyField]);
        var inputProps = {
          checked: checked,
          onClick: toggleSelection,
          selectType: selectType,
          id: row[keyField],
          row: row
        };
        return React.createElement(this.props.SelectInputComponent, inputProps);
      }
    }, {
      key: 'headSelector',
      value: function headSelector(row) {
        var selectType = this.props.selectType;

        if (selectType === 'radio') return null;

        var _props2 = this.props,
            toggleAll = _props2.toggleAll,
            checked = _props2.selectAll,
            SelectAllInputComponent = _props2.SelectAllInputComponent;

        var inputProps = {
          checked: checked,
          onClick: toggleAll,
          selectType: selectType
        };

        return React.createElement(SelectAllInputComponent, inputProps);
      }

      // this is so we can expose the underlying ReactTable to get at the sortedData for selectAll

    }, {
      key: 'getWrappedInstance',
      value: function getWrappedInstance() {
        if (!this.wrappedInstance) console.warn('RTSelectTable - No wrapped instance');
        if (this.wrappedInstance.getWrappedInstance) return this.wrappedInstance.getWrappedInstance();else return this.wrappedInstance;
      }
    }, {
      key: 'render',
      value: function render() {
        var _this2 = this;

        var _props3 = this.props,
            originalCols = _props3.columns,
            isSelected = _props3.isSelected,
            toggleSelection = _props3.toggleSelection,
            toggleAll = _props3.toggleAll,
            keyField = _props3.keyField,
            selectAll = _props3.selectAll,
            selectType = _props3.selectType,
            selectWidth = _props3.selectWidth,
            SelectAllInputComponent = _props3.SelectAllInputComponent,
            SelectInputComponent = _props3.SelectInputComponent,
            rest = _objectWithoutProperties(_props3, ['columns', 'isSelected', 'toggleSelection', 'toggleAll', 'keyField', 'selectAll', 'selectType', 'selectWidth', 'SelectAllInputComponent', 'SelectInputComponent']);

        var select = {
          id: '_selector',
          accessor: function accessor() {
            return 'x';
          }, // this value is not important
          Header: this.headSelector.bind(this),
          Cell: function Cell(ci) {
            return _this2.rowSelector.bind(_this2)(ci.original);
          },
          width: selectWidth || 30,
          filterable: false,
          sortable: false,
          resizable: false,
          style: { textAlign: 'center' }
        };
        var columns = [select].concat(_toConsumableArray(originalCols));
        var extra = {
          columns: columns
        };
        return React.createElement(Component, _extends({}, rest, extra, { ref: function ref(r) {
            return _this2.wrappedInstance = r;
          } }));
      }
    }]);

    return RTSelectTable;
  }(React.Component);

  wrapper.displayName = 'RTSelectTable';
  wrapper.defaultProps = {
    keyField: '_id',
    isSelected: function isSelected(key) {
      console.log('No isSelected handler provided:', { key: key });
    },
    selectAll: false,
    toggleSelection: function toggleSelection(key, shift, row) {
      console.log('No toggleSelection handler provided:', { key: key, shift: shift, row: row });
    },
    toggleAll: function toggleAll() {
      console.log('No toggleAll handler provided.');
    },
    selectType: 'check',
    SelectInputComponent: defaultSelectInputComponent,
    SelectAllInputComponent: defaultSelectInputComponent
  };

  return wrapper;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9ob2Mvc2VsZWN0VGFibGUvaW5kZXguanMiXSwibmFtZXMiOlsiUmVhY3QiLCJkZWZhdWx0U2VsZWN0SW5wdXRDb21wb25lbnQiLCJwcm9wcyIsInNlbGVjdFR5cGUiLCJjaGVja2VkIiwiZSIsInNoaWZ0S2V5Iiwic3RvcFByb3BhZ2F0aW9uIiwib25DbGljayIsImlkIiwicm93IiwiQ29tcG9uZW50Iiwid3JhcHBlciIsImhhc093blByb3BlcnR5Iiwia2V5RmllbGQiLCJ0b2dnbGVTZWxlY3Rpb24iLCJpc1NlbGVjdGVkIiwiaW5wdXRQcm9wcyIsImNyZWF0ZUVsZW1lbnQiLCJTZWxlY3RJbnB1dENvbXBvbmVudCIsInRvZ2dsZUFsbCIsInNlbGVjdEFsbCIsIlNlbGVjdEFsbElucHV0Q29tcG9uZW50Iiwid3JhcHBlZEluc3RhbmNlIiwiY29uc29sZSIsIndhcm4iLCJnZXRXcmFwcGVkSW5zdGFuY2UiLCJvcmlnaW5hbENvbHMiLCJjb2x1bW5zIiwic2VsZWN0V2lkdGgiLCJyZXN0Iiwic2VsZWN0IiwiYWNjZXNzb3IiLCJIZWFkZXIiLCJoZWFkU2VsZWN0b3IiLCJiaW5kIiwiQ2VsbCIsImNpIiwicm93U2VsZWN0b3IiLCJvcmlnaW5hbCIsIndpZHRoIiwiZmlsdGVyYWJsZSIsInNvcnRhYmxlIiwicmVzaXphYmxlIiwic3R5bGUiLCJ0ZXh0QWxpZ24iLCJleHRyYSIsInIiLCJkaXNwbGF5TmFtZSIsImRlZmF1bHRQcm9wcyIsImtleSIsImxvZyIsInNoaWZ0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBOztBQUVBLE9BQU9BLEtBQVAsTUFBa0IsT0FBbEI7O0FBRUEsSUFBTUMsOEJBQThCLFNBQTlCQSwyQkFBOEIsQ0FBQ0MsS0FBRCxFQUFXO0FBQzdDLFNBQ0U7QUFDRSxVQUFNQSxNQUFNQyxVQUFOLElBQW9CLFVBRDVCO0FBRUUsYUFBU0QsTUFBTUUsT0FGakI7QUFHRSxhQUFTLGlCQUFDQyxDQUFELEVBQUs7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LDBCQUFzQmxCLDJCQVB4QjtBQVFFcUIsNkJBQXlCckI7QUFSM0IsR0FEQTs7QUFZQSxTQUFPVyxPQUFQO0FBQ0QsQ0EzRkQiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5jb25zdCBkZWZhdWx0U2VsZWN0SW5wdXRDb21wb25lbnQgPSAocHJvcHMpID0+IHtcbiAgcmV0dXJuIChcbiAgICA8aW5wdXQgXG4gICAgICB0eXBlPXtwcm9wcy5zZWxlY3RUeXBlIHx8ICdjaGVja2JveCd9IFxuICAgICAgY2hlY2tlZD17cHJvcHMuY2hlY2tlZH0gXG4gICAgICBvbkNsaWNrPXsoZSk9PntcbiAgICAgICAgY29uc3QgeyBzaGlmdEtleSB9ID0gZTtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgcHJvcHMub25DbGljayhwcm9wcy5pZCwgc2hpZnRLZXksIHByb3BzLnJvdyk7XG4gICAgICB9fSBcbiAgICAgIG9uQ2hhbmdlPXsoKT0+e319ICBcbiAgICAvPlxuICApXG59XG5cbmV4cG9ydCBkZWZhdWx0IChDb21wb25lbnQpID0+IHtcblxuICBjb25zdCB3cmFwcGVyID0gY2xhc3MgUlRTZWxlY3RUYWJsZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcm9wcylcbiAgICB7XG4gICAgICBzdXBlcihwcm9wcyk7XG4gICAgfVxuXG4gICAgcm93U2VsZWN0b3Iocm93KSB7XG4gICAgICBpZighcm93IHx8ICFyb3cuaGFzT3duUHJvcGVydHkodGhpcy5wcm9wcy5rZXlGaWVsZCkpIHJldHVybiBudWxsO1xuICAgICAgY29uc3QgeyB0b2dnbGVTZWxlY3Rpb24sIHNlbGVjdFR5cGUsIGtleUZpZWxkIH0gPSB0aGlzLnByb3BzO1xuICAgICAgY29uc3QgY2hlY2tlZCA9IHRoaXMucHJvcHMuaXNTZWxlY3RlZChyb3dbdGhpcy5wcm9wcy5rZXlGaWVsZF0pO1xuICAgICAgY29uc3QgaW5wdXRQcm9wcyA9IFxuICAgICAge1xuICAgICAgICBjaGVja2VkLFxuICAgICAgICBvbkNsaWNrOiB0b2dnbGVTZWxlY3Rpb24sXG4gICAgICAgIHNlbGVjdFR5cGUsXG4gICAgICAgIGlkOiByb3dba2V5RmllbGRdLFxuICAgICAgICByb3csXG4gICAgICB9XG4gICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudCh0aGlzLnByb3BzLlNlbGVjdElucHV0Q29tcG9uZW50LGlucHV0UHJvcHMpO1xuICAgIH1cblxuICAgIGhlYWRTZWxlY3Rvcihyb3cpIHtcbiAgICAgIGNvbnN0IHsgc2VsZWN0VHlwZSB9ID0gdGhpcy5wcm9wcztcbiAgICAgIGlmIChzZWxlY3RUeXBlID09PSAncmFkaW8nKSByZXR1cm4gbnVsbDtcbiAgICAgIFxuICAgICAgY29uc3QgeyB0b2dnbGVBbGwsIHNlbGVjdEFsbDogY2hlY2tlZCwgU2VsZWN0QWxsSW5wdXRDb21wb25lbnQsIH0gPSB0aGlzLnByb3BzO1xuICAgICAgY29uc3QgaW5wdXRQcm9wcyA9IFxuICAgICAge1xuICAgICAgICBjaGVja2VkLFxuICAgICAgICBvbkNsaWNrOiB0b2dnbGVBbGwsXG4gICAgICAgIHNlbGVjdFR5cGUsXG4gICAgICB9XG4gICAgICBcbiAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFNlbGVjdEFsbElucHV0Q29tcG9uZW50LGlucHV0UHJvcHMpO1xuICAgIH1cbiAgICBcbiAgICAvLyB0aGlzIGlzIHNvIHdlIGNhbiBleHBvc2UgdGhlIHVuZGVybHlpbmcgUmVhY3RUYWJsZSB0byBnZXQgYXQgdGhlIHNvcnRlZERhdGEgZm9yIHNlbGVjdEFsbFxuICAgIGdldFdyYXBwZWRJbnN0YW5jZSgpIHtcbiAgICAgIGlmICghdGhpcy53cmFwcGVkSW5zdGFuY2UpIGNvbnNvbGUud2FybignUlRTZWxlY3RUYWJsZSAtIE5vIHdyYXBwZWQgaW5zdGFuY2UnKTtcbiAgICAgIGlmICh0aGlzLndyYXBwZWRJbnN0YW5jZS5nZXRXcmFwcGVkSW5zdGFuY2UpIHJldHVybiB0aGlzLndyYXBwZWRJbnN0YW5jZS5nZXRXcmFwcGVkSW5zdGFuY2UoKTtcbiAgICAgIGVsc2UgcmV0dXJuIHRoaXMud3JhcHBlZEluc3RhbmNlXG4gICAgfVxuXG4gICAgcmVuZGVyKClcbiAgICB7XG4gICAgICBjb25zdCB7IFxuICAgICAgICBjb2x1bW5zOm9yaWdpbmFsQ29scywgaXNTZWxlY3RlZCwgdG9nZ2xlU2VsZWN0aW9uLCB0b2dnbGVBbGwsIGtleUZpZWxkLCBzZWxlY3RBbGwsIFxuICAgICAgICBzZWxlY3RUeXBlLCBzZWxlY3RXaWR0aCwgU2VsZWN0QWxsSW5wdXRDb21wb25lbnQsIFNlbGVjdElucHV0Q29tcG9uZW50LFxuICAgICAgICAuLi5yZXN0IFxuICAgICAgfSA9IHRoaXMucHJvcHM7XG4gICAgICBjb25zdCBzZWxlY3QgPSB7XG4gICAgICAgIGlkOiAnX3NlbGVjdG9yJyxcbiAgICAgICAgYWNjZXNzb3I6ICgpPT4neCcsIC8vIHRoaXMgdmFsdWUgaXMgbm90IGltcG9ydGFudFxuICAgICAgICBIZWFkZXI6IHRoaXMuaGVhZFNlbGVjdG9yLmJpbmQodGhpcyksXG4gICAgICAgIENlbGw6IChjaSkgPT4geyByZXR1cm4gdGhpcy5yb3dTZWxlY3Rvci5iaW5kKHRoaXMpKGNpLm9yaWdpbmFsKTsgfSxcbiAgICAgICAgd2lkdGg6IHNlbGVjdFdpZHRoIHx8IDMwLFxuICAgICAgICBmaWx0ZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgc29ydGFibGU6IGZhbHNlLFxuICAgICAgICByZXNpemFibGU6IGZhbHNlLFxuICAgICAgICBzdHlsZTogeyB0ZXh0QWxpZ246ICdjZW50ZXInIH0sXG4gICAgICB9XG4gICAgICBjb25zdCBjb2x1bW5zID0gW1xuICAgICAgICBzZWxlY3QsXG4gICAgICAgIC4uLm9yaWdpbmFsQ29scyxcbiAgICAgIF07XG4gICAgICBjb25zdCBleHRyYSA9IHtcbiAgICAgICAgY29sdW1ucyxcbiAgICAgIH07XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8Q29tcG9uZW50IHsuLi5yZXN0fSB7Li4uZXh0cmF9IHJlZj17KHIpPT50aGlzLndyYXBwZWRJbnN0YW5jZT1yfS8+XG4gICAgICApXG4gICAgfVxuICB9XG5cbiAgd3JhcHBlci5kaXNwbGF5TmFtZSA9ICdSVFNlbGVjdFRhYmxlJztcbiAgd3JhcHBlci5kZWZhdWx0UHJvcHMgPSBcbiAge1xuICAgIGtleUZpZWxkOiAnX2lkJyxcbiAgICBpc1NlbGVjdGVkOiAoa2V5KT0+eyBjb25zb2xlLmxvZygnTm8gaXNTZWxlY3RlZCBoYW5kbGVyIHByb3ZpZGVkOicse2tleX0pfSxcbiAgICBzZWxlY3RBbGw6IGZhbHNlLFxuICAgIHRvZ2dsZVNlbGVjdGlvbjogKGtleSwgc2hpZnQsIHJvdyk9PnsgY29uc29sZS5sb2coJ05vIHRvZ2dsZVNlbGVjdGlvbiBoYW5kbGVyIHByb3ZpZGVkOicsIHsga2V5LCBzaGlmdCwgcm93IH0pIH0sXG4gICAgdG9nZ2xlQWxsOiAoKSA9PiB7IGNvbnNvbGUubG9nKCdObyB0b2dnbGVBbGwgaGFuZGxlciBwcm92aWRlZC4nKSB9LFxuICAgIHNlbGVjdFR5cGU6ICdjaGVjaycsXG4gICAgU2VsZWN0SW5wdXRDb21wb25lbnQ6IGRlZmF1bHRTZWxlY3RJbnB1dENvbXBvbmVudCxcbiAgICBTZWxlY3RBbGxJbnB1dENvbXBvbmVudDogZGVmYXVsdFNlbGVjdElucHV0Q29tcG9uZW50LFxuICB9XG4gIFxuICByZXR1cm4gd3JhcHBlcjtcbn1cbiJdfQ==