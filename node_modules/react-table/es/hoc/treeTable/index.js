var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* eslint-disable */

import React from 'react';

export default (function (Component) {
  var _class, _temp, _initialiseProps;

  var wrapper = (_temp = _class = function (_React$Component) {
    _inherits(RTTreeTable, _React$Component);

    function RTTreeTable(props) {
      _classCallCheck(this, RTTreeTable);

      var _this = _possibleConstructorReturn(this, (RTTreeTable.__proto__ || Object.getPrototypeOf(RTTreeTable)).call(this, props));

      _initialiseProps.call(_this);

      _this.getWrappedInstance.bind(_this);
      _this.TrComponent.bind(_this);
      _this.getTrProps.bind(_this);
      return _this;
    }

    // this is so we can expose the underlying ReactTable to get at the sortedData for selectAll


    _createClass(RTTreeTable, [{
      key: 'render',
      value: function render() {
        var _this2 = this;

        var _props = this.props,
            columns = _props.columns,
            treeTableIndent = _props.treeTableIndent,
            rest = _objectWithoutProperties(_props, ['columns', 'treeTableIndent']);

        var TrComponent = this.TrComponent,
            getTrProps = this.getTrProps;

        var extra = {
          columns: columns.map(function (col) {
            var column = col;
            if (rest.pivotBy && rest.pivotBy.includes(col.accessor)) {
              column = {
                accessor: col.accessor,
                width: treeTableIndent + 'px',
                show: false,
                Header: ''
              };
            }
            return column;
          }),
          TrComponent: TrComponent,
          getTrProps: getTrProps
        };

        return React.createElement(Component, _extends({}, rest, extra, { ref: function ref(r) {
            return _this2.wrappedInstance = r;
          } }));
      }
    }]);

    return RTTreeTable;
  }(React.Component), _initialiseProps = function _initialiseProps() {
    var _this3 = this;

    this.getWrappedInstance = function () {
      if (!_this3.wrappedInstance) console.warn('RTTreeTable - No wrapped instance');
      if (_this3.wrappedInstance.getWrappedInstance) return _this3.wrappedInstance.getWrappedInstance();else return _this3.wrappedInstance;
    };

    this.TrComponent = function (props) {
      var ri = props.ri,
          rest = _objectWithoutProperties(props, ['ri']);

      if (ri && ri.groupedByPivot) {
        var cell = _extends({}, props.children[ri.level]);

        cell.props.style.flex = 'unset';
        cell.props.style.width = '100%';
        cell.props.style.maxWidth = 'unset';
        cell.props.style.paddingLeft = _this3.props.treeTableIndent * ri.level + 'px';
        // cell.props.style.backgroundColor = '#DDD';
        cell.props.style.borderBottom = '1px solid rgba(128,128,128,0.2)';

        return React.createElement(
          'div',
          { className: 'rt-tr ' + rest.className, style: rest.style },
          cell
        );
      }
      return React.createElement(Component.defaultProps.TrComponent, rest);
    };

    this.getTrProps = function (state, ri, ci, instance) {
      return { ri: ri };
    };
  }, _temp);
  wrapper.displayName = 'RTTreeTable';
  wrapper.defaultProps = {
    treeTableIndent: 10
  };

  return wrapper;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9ob2MvdHJlZVRhYmxlL2luZGV4LmpzIl0sIm5hbWVzIjpbIlJlYWN0IiwiQ29tcG9uZW50Iiwid3JhcHBlciIsInByb3BzIiwiZ2V0V3JhcHBlZEluc3RhbmNlIiwiYmluZCIsIlRyQ29tcG9uZW50IiwiZ2V0VHJQcm9wcyIsImNvbHVtbnMiLCJ0cmVlVGFibGVJbmRlbnQiLCJyZXN0IiwiZXh0cmEiLCJtYXAiLCJjb2wiLCJjb2x1bW4iLCJwaXZvdEJ5IiwiaW5jbHVkZXMiLCJhY2Nlc3NvciIsIndpZHRoIiwic2hvdyIsIkhlYWRlciIsIndyYXBwZWRJbnN0YW5jZSIsInIiLCJjb25zb2xlIiwid2FybiIsInJpIiwiZ3JvdXBlZEJ5UGl2b3QiLCJjZWxsIiwiY2hpbGRyZW4iLCJsZXZlbCIsInN0eWxlIiwiZmxleCIsIm1heFdpZHRoIiwicGFkZGluZ0xlZnQiLCJib3JkZXJCb3R0b20iLCJjbGFzc05hbWUiLCJzdGF0ZSIsImNpIiwiaW5zdGFuY2UiLCJkaXNwbGF5TmFtZSIsImRlZmF1bHRQcm9wcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUE7O0FBRUEsT0FBT0EsS0FBUCxNQUFrQixPQUFsQjs7QUFFQSxnQkFBZSxVQUFDQyxTQUFELEVBQWU7QUFBQTs7QUFDNUIsTUFBTUM7QUFBQTs7QUFFSix5QkFBWUMsS0FBWixFQUNBO0FBQUE7O0FBQUEsNEhBQ1FBLEtBRFI7O0FBQUE7O0FBRUUsWUFBS0Msa0JBQUwsQ0FBd0JDLElBQXhCO0FBQ0EsWUFBS0MsV0FBTCxDQUFpQkQsSUFBakI7QUFDQSxZQUFLRSxVQUFMLENBQWdCRixJQUFoQjtBQUpGO0FBS0M7O0FBRUQ7OztBQVZJO0FBQUE7QUFBQSwrQkF5Q0s7QUFBQTs7QUFBQSxxQkFDdUMsS0FBS0YsS0FENUM7QUFBQSxZQUNDSyxPQURELFVBQ0NBLE9BREQ7QUFBQSxZQUNVQyxlQURWLFVBQ1VBLGVBRFY7QUFBQSxZQUM4QkMsSUFEOUI7O0FBQUEsWUFFQ0osV0FGRCxHQUU2QixJQUY3QixDQUVDQSxXQUZEO0FBQUEsWUFFY0MsVUFGZCxHQUU2QixJQUY3QixDQUVjQSxVQUZkOztBQUdQLFlBQU1JLFFBQVE7QUFDWkgsbUJBQVNBLFFBQVFJLEdBQVIsQ0FBWSxVQUFDQyxHQUFELEVBQU87QUFDMUIsZ0JBQUlDLFNBQVNELEdBQWI7QUFDQSxnQkFBR0gsS0FBS0ssT0FBTCxJQUFnQkwsS0FBS0ssT0FBTCxDQUFhQyxRQUFiLENBQXNCSCxJQUFJSSxRQUExQixDQUFuQixFQUNBO0FBQ0VILHVCQUFTO0FBQ1BHLDBCQUFVSixJQUFJSSxRQURQO0FBRVBDLHVCQUFVVCxlQUFWLE9BRk87QUFHUFUsc0JBQU0sS0FIQztBQUlQQyx3QkFBUTtBQUpELGVBQVQ7QUFNRDtBQUNELG1CQUFPTixNQUFQO0FBQ0QsV0FaUSxDQURHO0FBY1pSLGtDQWRZO0FBZVpDO0FBZlksU0FBZDs7QUFrQkEsZUFDRSxvQkFBQyxTQUFELGVBQWVHLElBQWYsRUFBeUJDLEtBQXpCLElBQWdDLEtBQU07QUFBQSxtQkFBSyxPQUFLVSxlQUFMLEdBQXFCQyxDQUExQjtBQUFBLFdBQXRDLElBREY7QUFHRDtBQWpFRzs7QUFBQTtBQUFBLElBQW9DdEIsTUFBTUMsU0FBMUM7QUFBQTs7QUFBQSxTQVdKRyxrQkFYSSxHQVdpQixZQUFNO0FBQ3pCLFVBQUksQ0FBQyxPQUFLaUIsZUFBVixFQUEyQkUsUUFBUUMsSUFBUixDQUFhLG1DQUFiO0FBQzNCLFVBQUksT0FBS0gsZUFBTCxDQUFxQmpCLGtCQUF6QixFQUE2QyxPQUFPLE9BQUtpQixlQUFMLENBQXFCakIsa0JBQXJCLEVBQVAsQ0FBN0MsS0FDSyxPQUFPLE9BQUtpQixlQUFaO0FBQ04sS0FmRzs7QUFBQSxTQWlCSmYsV0FqQkksR0FpQlUsVUFBQ0gsS0FBRCxFQUFXO0FBQUEsVUFFckJzQixFQUZxQixHQUluQnRCLEtBSm1CLENBRXJCc0IsRUFGcUI7QUFBQSxVQUdsQmYsSUFIa0IsNEJBSW5CUCxLQUptQjs7QUFLdkIsVUFBR3NCLE1BQU1BLEdBQUdDLGNBQVosRUFBNEI7QUFDMUIsWUFBTUMsb0JBQVd4QixNQUFNeUIsUUFBTixDQUFlSCxHQUFHSSxLQUFsQixDQUFYLENBQU47O0FBRUFGLGFBQUt4QixLQUFMLENBQVcyQixLQUFYLENBQWlCQyxJQUFqQixHQUF3QixPQUF4QjtBQUNBSixhQUFLeEIsS0FBTCxDQUFXMkIsS0FBWCxDQUFpQlosS0FBakIsR0FBeUIsTUFBekI7QUFDQVMsYUFBS3hCLEtBQUwsQ0FBVzJCLEtBQVgsQ0FBaUJFLFFBQWpCLEdBQTRCLE9BQTVCO0FBQ0FMLGFBQUt4QixLQUFMLENBQVcyQixLQUFYLENBQWlCRyxXQUFqQixHQUFrQyxPQUFLOUIsS0FBTCxDQUFXTSxlQUFYLEdBQTJCZ0IsR0FBR0ksS0FBaEU7QUFDQTtBQUNBRixhQUFLeEIsS0FBTCxDQUFXMkIsS0FBWCxDQUFpQkksWUFBakIsR0FBZ0MsaUNBQWhDOztBQUVBLGVBQU87QUFBQTtBQUFBLFlBQUssc0JBQW9CeEIsS0FBS3lCLFNBQTlCLEVBQTJDLE9BQU96QixLQUFLb0IsS0FBdkQ7QUFBK0RIO0FBQS9ELFNBQVA7QUFDRDtBQUNELGFBQU8sb0JBQUMsU0FBRCxDQUFXLFlBQVgsQ0FBd0IsV0FBeEIsRUFBd0NqQixJQUF4QyxDQUFQO0FBQ0QsS0FuQ0c7O0FBQUEsU0FxQ0pILFVBckNJLEdBcUNTLFVBQUM2QixLQUFELEVBQU9YLEVBQVAsRUFBVVksRUFBVixFQUFhQyxRQUFiLEVBQTBCO0FBQ3JDLGFBQU8sRUFBQ2IsTUFBRCxFQUFQO0FBQ0QsS0F2Q0c7QUFBQSxXQUFOO0FBbUVBdkIsVUFBUXFDLFdBQVIsR0FBc0IsYUFBdEI7QUFDQXJDLFVBQVFzQyxZQUFSLEdBQ0E7QUFDRS9CLHFCQUFpQjtBQURuQixHQURBOztBQUtBLFNBQU9QLE9BQVA7QUFDRCxDQTNFRCIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcblxuZXhwb3J0IGRlZmF1bHQgKENvbXBvbmVudCkgPT4ge1xuICBjb25zdCB3cmFwcGVyID0gY2xhc3MgUlRUcmVlVGFibGUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIFxuICAgIGNvbnN0cnVjdG9yKHByb3BzKVxuICAgIHtcbiAgICAgIHN1cGVyKHByb3BzKTtcbiAgICAgIHRoaXMuZ2V0V3JhcHBlZEluc3RhbmNlLmJpbmQodGhpcyk7XG4gICAgICB0aGlzLlRyQ29tcG9uZW50LmJpbmQodGhpcyk7XG4gICAgICB0aGlzLmdldFRyUHJvcHMuYmluZCh0aGlzKTtcbiAgICB9XG5cbiAgICAvLyB0aGlzIGlzIHNvIHdlIGNhbiBleHBvc2UgdGhlIHVuZGVybHlpbmcgUmVhY3RUYWJsZSB0byBnZXQgYXQgdGhlIHNvcnRlZERhdGEgZm9yIHNlbGVjdEFsbFxuICAgIGdldFdyYXBwZWRJbnN0YW5jZSA9ICgpID0+IHtcbiAgICAgIGlmICghdGhpcy53cmFwcGVkSW5zdGFuY2UpIGNvbnNvbGUud2FybignUlRUcmVlVGFibGUgLSBObyB3cmFwcGVkIGluc3RhbmNlJyk7XG4gICAgICBpZiAodGhpcy53cmFwcGVkSW5zdGFuY2UuZ2V0V3JhcHBlZEluc3RhbmNlKSByZXR1cm4gdGhpcy53cmFwcGVkSW5zdGFuY2UuZ2V0V3JhcHBlZEluc3RhbmNlKCk7XG4gICAgICBlbHNlIHJldHVybiB0aGlzLndyYXBwZWRJbnN0YW5jZVxuICAgIH1cblxuICAgIFRyQ29tcG9uZW50ID0gKHByb3BzKSA9PiB7XG4gICAgICBjb25zdCB7IFxuICAgICAgICByaSxcbiAgICAgICAgLi4ucmVzdCBcbiAgICAgIH0gPSBwcm9wcztcbiAgICAgIGlmKHJpICYmIHJpLmdyb3VwZWRCeVBpdm90KSB7XG4gICAgICAgIGNvbnN0IGNlbGwgPSB7Li4ucHJvcHMuY2hpbGRyZW5bcmkubGV2ZWxdfTtcbiAgICAgICAgXG4gICAgICAgIGNlbGwucHJvcHMuc3R5bGUuZmxleCA9ICd1bnNldCc7XG4gICAgICAgIGNlbGwucHJvcHMuc3R5bGUud2lkdGggPSAnMTAwJSc7XG4gICAgICAgIGNlbGwucHJvcHMuc3R5bGUubWF4V2lkdGggPSAndW5zZXQnO1xuICAgICAgICBjZWxsLnByb3BzLnN0eWxlLnBhZGRpbmdMZWZ0ID0gYCR7dGhpcy5wcm9wcy50cmVlVGFibGVJbmRlbnQqcmkubGV2ZWx9cHhgO1xuICAgICAgICAvLyBjZWxsLnByb3BzLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICcjREREJztcbiAgICAgICAgY2VsbC5wcm9wcy5zdHlsZS5ib3JkZXJCb3R0b20gPSAnMXB4IHNvbGlkIHJnYmEoMTI4LDEyOCwxMjgsMC4yKSc7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9e2BydC10ciAke3Jlc3QuY2xhc3NOYW1lfWB9IHN0eWxlPXtyZXN0LnN0eWxlfT57Y2VsbH08L2Rpdj47XG4gICAgICB9XG4gICAgICByZXR1cm4gPENvbXBvbmVudC5kZWZhdWx0UHJvcHMuVHJDb21wb25lbnQgey4uLnJlc3R9IC8+O1xuICAgIH1cblxuICAgIGdldFRyUHJvcHMgPSAoc3RhdGUscmksY2ksaW5zdGFuY2UpID0+IHtcbiAgICAgIHJldHVybiB7cml9O1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgIGNvbnN0IHsgY29sdW1ucywgdHJlZVRhYmxlSW5kZW50LCAuLi5yZXN0IH0gPSB0aGlzLnByb3BzO1xuICAgICAgY29uc3QgeyBUckNvbXBvbmVudCwgZ2V0VHJQcm9wcyB9ID0gdGhpcztcbiAgICAgIGNvbnN0IGV4dHJhID0ge1xuICAgICAgICBjb2x1bW5zOiBjb2x1bW5zLm1hcCgoY29sKT0+e1xuICAgICAgICAgIGxldCBjb2x1bW4gPSBjb2w7XG4gICAgICAgICAgaWYocmVzdC5waXZvdEJ5ICYmIHJlc3QucGl2b3RCeS5pbmNsdWRlcyhjb2wuYWNjZXNzb3IpKVxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGNvbHVtbiA9IHtcbiAgICAgICAgICAgICAgYWNjZXNzb3I6IGNvbC5hY2Nlc3NvcixcbiAgICAgICAgICAgICAgd2lkdGg6IGAke3RyZWVUYWJsZUluZGVudH1weGAsXG4gICAgICAgICAgICAgIHNob3c6IGZhbHNlLFxuICAgICAgICAgICAgICBIZWFkZXI6ICcnLFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gY29sdW1uO1xuICAgICAgICB9KSxcbiAgICAgICAgVHJDb21wb25lbnQsXG4gICAgICAgIGdldFRyUHJvcHMsXG4gICAgICB9O1xuICAgICAgXG4gICAgICByZXR1cm4gKFxuICAgICAgICA8Q29tcG9uZW50IHsuLi5yZXN0fSB7Li4uZXh0cmF9IHJlZj17IHIgPT4gdGhpcy53cmFwcGVkSW5zdGFuY2U9ciB9Lz5cbiAgICAgIClcbiAgICB9XG4gIH1cbiAgd3JhcHBlci5kaXNwbGF5TmFtZSA9ICdSVFRyZWVUYWJsZSc7XG4gIHdyYXBwZXIuZGVmYXVsdFByb3BzID0gXG4gIHtcbiAgICB0cmVlVGFibGVJbmRlbnQ6IDEwLFxuICB9XG4gIFxuICByZXR1cm4gd3JhcHBlcjtcbn1cbiJdfQ==