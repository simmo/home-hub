import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import classnames from 'classnames'
import throttle from 'lodash.throttle'
import Icon from 'components/icon'

import 'styles/components/screen'

export default class Screen extends Component {
    static propTypes = {
        backUrl: PropTypes.string,
        children: PropTypes.any.isRequired,
        className : PropTypes.string,
        title: PropTypes.string.isRequired
    }

    state = {
        previousScrollTop: 0,
        header: {
            animate: false,
            fixed: false,
            visible: false
        }
    }

    scroll() {
        const scrollDiff = this.root.scrollTop - this.state.previousScrollTop
        const fixedNav = (scrollDiff < 0 && this.root.scrollTop > 0) || (scrollDiff >= 0 && this.root.scrollTop > this.header.offsetHeight)

        this.setState({
            ...this.state,
            previousScrollTop: this.root.scrollTop,
            header: {
                ...this.state.header,
                fixed: fixedNav,
                visible: scrollDiff < 0 && this.root.scrollTop !== 0
            }
        })

        // Delay animate class to reduce animate stutter
        setTimeout(() => {
            this.setState({
                ...this.state,
                header: {
                    ...this.state.header,
                    animate: fixedNav
                }
            })
        }, 0)
    }

    render() {
        const { backUrl, children, className, title } = this.props
        const headerCssClass = 'screen__header'

        return (
            <div className={classnames('screen', className)} ref={node => this.root = node} onScroll={throttle(this.scroll.bind(this), 400)}>
                <header className={classnames(headerCssClass, {
                    [`${headerCssClass}--animate`]: this.state.header.animate,
                    [`${headerCssClass}--fixed`]: this.state.header.fixed,
                    [`${headerCssClass}--visible`]: this.state.header.visible
                })} ref={node => this.header = node}>
                    <h1 className="screen__title">{title}</h1>
                    {backUrl && <Link to={backUrl} className="screen__back"><Icon name="back" text="Back" /></Link>}
                </header>
                {children}
            </div>
        )
    }
}
